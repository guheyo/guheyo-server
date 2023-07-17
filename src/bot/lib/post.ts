import _, { isEmpty } from 'lodash';
import {
  ChannelType,
  Guild,
  Message,
  PartialMessage,
  TextChannel,
} from 'discord.js';
import { Post, User } from '@prisma/client';
import { validateAuthor, validateFormat } from './validate';
import config from '../config';
import { prisma } from '../../loaders';
import imageService from '../../services/image-service';
import { getOrCreateUser } from './user';

interface ParsePostParams {
  messageId: string;
  createdAt: Date;
  categoryId: string;
  type: string;
  title: string;
  price: number;
  content: string;
  subTitle?: string;
}

interface ParseImageParams {
  name: string;
  size: number;
  url: string;
  height: number | null;
  width: number | null;
}

enum EventType {
  create,
  update,
}

const botConfig = _.get(config, `bot`);

const isNotAllowedChannel = (prefix: string, msg: Message): boolean =>
  !_.get(botConfig, `${prefix}.allowedChannelIdToCategoryId.${msg.channelId}`);

const parseSellBuyMessage = (
  type: string,
  postType: string,
  msg: Message,
): ParsePostParams => {
  const match = validateFormat(msg, postType);
  const model: string = match[1].trim();
  const price: number = Number(match[2]) * 10000;
  const content: string = match[3].trim();

  const postData = {
    messageId: msg.id,
    createdAt: msg.createdAt,
    categoryId: _.get(
      botConfig,
      `${type}.allowedChannelIdToCategoryId.${msg.channelId}`,
      '',
    ),
    type: postType,
    title: model,
    price,
    content,
  };
  return postData;
};

const parseTradeMessage = (msg: Message): ParsePostParams => {
  const match = validateFormat(msg, 'trade');
  const mine: string = match[1].trim();
  const yours: string = match[2].trim();
  const content: string = match[3].trim();

  const postData = {
    messageId: msg.id,
    createdAt: msg.createdAt,
    categoryId: _.get(
      botConfig,
      `wtt.allowedChannelIdToCategoryId.${msg.channelId}`,
      '',
    ),
    type: 'trade',
    title: mine,
    subTitle: yours,
    price: 0,
    content,
  };
  return postData;
};

const parseMessage = async (
  msg: Message,
  eventType: number,
): Promise<ParsePostParams | null> => {
  const prefix = msg.content.toLowerCase().slice(0, 3);
  if (!prefix) return null;

  switch (prefix) {
    case 'wts': {
      if (isNotAllowedChannel(prefix, msg)) return null;
      await validateAuthor(msg, _.get(botConfig, `wts.allowedRoles`, []));
      if (
        isEmpty(msg.attachments) &&
        !/https:\/\/imgur\.com/.test(msg.content)
      ) {
        if (eventType === EventType.create) throw new Error('No images');
      }
      return parseSellBuyMessage(prefix, 'sell', msg);
    }
    case 'wtb': {
      if (isNotAllowedChannel(prefix, msg)) return null;
      await validateAuthor(msg, _.get(botConfig, `wtb.allowedRoles`, []));
      return parseSellBuyMessage(prefix, 'buy', msg);
    }
    case 'wtt': {
      if (isNotAllowedChannel(prefix, msg)) return null;
      await validateAuthor(msg, _.get(botConfig, `wtt.allowedRoles`, []));
      if (
        isEmpty(msg.attachments) &&
        !/https:\/\/imgur\.com/.test(msg.content)
      ) {
        if (eventType === EventType.create) throw new Error('No images');
      }
      return parseTradeMessage(msg);
    }
    default: {
      return null;
    }
  }
};

const parseImages = (msg: Message): ParseImageParams[] => {
  const init: ParseImageParams[] = [];
  return msg.attachments.reduce((images, attachment) => {
    if (!attachment.url) return images;
    const image = _.pick(attachment, [
      'name',
      'size',
      'url',
      'height',
      'width',
    ]);
    images.push(image);
    return images;
  }, init);
};

const upsertPost = async (user: User, msg: Message) => {
  const postData = await parseMessage(msg, EventType.create);
  const imagesData = parseImages(msg);
  if (isEmpty(postData)) return null;

  const post = await prisma.post.upsert({
    where: {
      messageId: msg.id,
    },
    update: {
      ...postData,
    },
    create: {
      ...postData,
      userId: user.id,
    },
  });
  if (_.isEmpty(imagesData)) return post;

  const image = await prisma.image.findFirst({
    where: {
      userId: user.id,
      postId: post.id,
    },
  });

  if (!image) {
    await Promise.all(
      _.map(imagesData, async (imageData) => {
        try {
          imageData.url = await imageService.uploadFileFromURL({
            url: imageData.url,
            type: 'posts',
            id: post.id,
          });
          const createdImage = await prisma.image.create({
            data: {
              userId: user.id,
              postId: post.id,
              ...imageData,
            },
          });
          return createdImage;
        } catch (e) {
          console.log(e);
          return null;
        }
      }),
    );
  }
  return post;
};

const savePostFromMessage = async (msg: Message): Promise<Post | null> => {
  try {
    let { member } = msg;
    if (!member) {
      const { guild } = msg;
      if (!guild) throw new Error('No guild');
      member = await guild.members.fetch(msg.author.id);
    }
    const user = await getOrCreateUser(member);
    const post = await upsertPost(user, msg);
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getChannelIds = (): Array<string> => {
  const channelIds = Object.keys(
    _.get(botConfig, 'wts.allowedChannelIdToCategoryId', {}),
  );
  channelIds.push(
    ...Object.keys(_.get(botConfig, 'wtb.allowedChannelIdToCategoryId', {})),
  );
  channelIds.push(
    ...Object.keys(_.get(botConfig, 'wtt.allowedChannelIdToCategoryId', {})),
  );
  return channelIds;
};

const bulkSaveChannelPosts = async (channel: TextChannel, quantity: number) => {
  try {
    const messages = await channel.messages.fetch({
      limit: quantity,
    });

    messages.forEach(async (msg) => {
      try {
        await savePostFromMessage(msg);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const bulkSavePosts = async (guild: Guild, quantity: number, ms: number) => {
  try {
    const channelIds = getChannelIds();
    channelIds.map(async (channelId, i) => {
      setTimeout(async () => {
        try {
          const channel = await guild.channels.fetch(channelId);
          if (!channel) return;
          if (channel.type !== ChannelType.GuildText) return;
          await bulkSaveChannelPosts(channel, quantity);
        } catch (e) {
          console.log(e);
        }
      }, i * ms);
    });
  } catch (e) {
    console.log(e);
  }
};

const updatePostFromMessage = async (
  oldMsg: Message | PartialMessage,
  newMsg: Message | PartialMessage,
): Promise<Post | null> => {
  try {
    const msg = newMsg.partial ? await newMsg.fetch() : newMsg;
    const post = await prisma.post.update({
      where: {
        messageId: newMsg.id,
      },
      data: {
        ...(await parseMessage(msg, EventType.update)),
      },
    });
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const deletePostFromMessage = async (
  msg: Message | PartialMessage,
): Promise<Post | null> => {
  try {
    const post = await prisma.post.delete({
      where: {
        messageId: msg.id,
      },
    });
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export {
  savePostFromMessage,
  updatePostFromMessage,
  deletePostFromMessage,
  bulkSavePosts,
  upsertPost,
};
