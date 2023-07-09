import _, { isEmpty } from 'lodash';;
import { ChannelType, Guild, Message, PartialMessage, TextChannel } from "discord.js";
import { validateAuthor, validateFormat } from "./validate";
import config from "../config";
import { Post, User } from '@prisma/client';
import { prisma } from '../../loaders';
import imageService from '../../services/imageService';
import { getOrCreateUser } from './user';

const botConfig = _.get(config, `bot`);

const savePostFromMessage = async (msg: Message): Promise<Post | null> => {
  try {
    let member = msg.member;
    if (!member) {
      const guild = msg.guild;
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

const upsertPost = async (user: User, msg: Message) => {
  const postData = await parseMessage(msg, EventType.create);
  const imagesData = parseImages(msg);
  if (isEmpty(postData)) return null;

  const post = await prisma.post.upsert({
    where: {
      messageId: msg.id
    }, 
    update: {
      ... postData,
    },
    create: {
      ... postData,
      userId: user.id,
    }
  });
  if (_.isEmpty(imagesData)) return post;

  const image = await prisma.image.findFirst({
    where: {
      userId: user.id,
      postId: post.id
    }
  });

  if (!image) {
    await Promise.all(_.map(imagesData, async (imageData) => {
      try {
        imageData.url = await imageService.uploadFileFromURL({url: imageData.url, type: 'posts', id: post.id});
        const image = await prisma.image.create({
          data: {
            userId: user.id,
            postId: post.id,
            ...imageData
          }
        });
        return image;
      } catch(e) {
        console.log(e);
      }
    }));
  }
  return post;
};

const bulkSavePosts = async (guild: Guild, quantity: number, ms: number) => {
  try {    
    const channelIds = getChannelIds();
    channelIds.map(async (channelId, i) => {
      setTimeout(async () => {
        try {
          const channel = await guild.channels.fetch(channelId);
          if (!channel) return;
          if (channel.type !== ChannelType.GuildText) return ;            
          await bulkSaveChannelPosts(channel, quantity);
        } catch(e) {
          console.log(e);
        }
      }, i*ms);
    });
  } catch (e) {
    console.log(e);
  }
};

const bulkSaveChannelPosts = async (channel: TextChannel, quantity: number) => {
  try {
    const messages = await channel.messages.fetch({
      limit: quantity
    });

    messages.forEach(async (msg) => {
      try {
        await savePostFromMessage(msg);
      } catch(e) {
        console.log(e);
      }
    })
  } catch (e) {
    console.log(e);
  }
};

const getChannelIds = (): Array<string> => {
  let channelIds = Object.keys(_.get(botConfig, 'wts.allowedChannelIdToCategoryId', {}));
  channelIds.push(... Object.keys(_.get(botConfig, 'wtb.allowedChannelIdToCategoryId', {}))); 
  channelIds.push(... Object.keys(_.get(botConfig, 'wtt.allowedChannelIdToCategoryId', {}))); 
  return channelIds;
};

const updatePostFromMessage = async (oldMsg: Message | PartialMessage, newMsg: Message | PartialMessage ): Promise<Post | null> => {
  try {
    const msg = newMsg.partial ? await newMsg.fetch() : newMsg;
    const post = await prisma.post.update({
      where: {
        messageId: newMsg.id
      },
      data: {
        ... await parseMessage(msg, EventType.update)
      }
    });
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const deletePostFromMessage = async (msg: Message | PartialMessage): Promise<Post | null> => {
  try {
    const post = await prisma.post.delete({
      where: {
        messageId: msg.id
      }
    });
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const parseMessage = async (msg: Message, eventType: number) => {
  const prefix = msg.content.toLowerCase().slice(0, 3);
  if (!prefix) return;

  switch (prefix) {
    case 'wts': {
      if (isNotAllowedChannel(prefix, msg)) return ;
      await validateAuthor(msg, _.get(botConfig, `wts.allowedRoles`, []));
      if (isEmpty(msg.attachments) && !/https:\/\/imgur\.com/.test(msg.content)) {
        if (eventType == EventType.create) throw new Error('No images');
      }
      return parseSellBuyMessage(prefix, 'sell', msg);
    }
    case 'wtb': {
      if (isNotAllowedChannel(prefix, msg)) return ;
      await validateAuthor(msg, _.get(botConfig, `wtb.allowedRoles`, []));
      return parseSellBuyMessage(prefix, 'buy', msg);
    }
    case 'wtt': {
      if (isNotAllowedChannel(prefix, msg)) return ;
      await validateAuthor(msg, _.get(botConfig, `wtt.allowedRoles`, []));
      if (isEmpty(msg.attachments) && !/https:\/\/imgur\.com/.test(msg.content)) {
        if (eventType == EventType.create) throw new Error('No images');
      }
      return parseTradeMessage(msg);
    }
  }
};

const isNotAllowedChannel = (prefix: string, msg:Message): boolean => {
  return !_.get(botConfig, `${prefix}.allowedChannelIdToCategoryId.${msg.channelId}`);
};

const parseSellBuyMessage = (type: string, postType: string, msg: Message): parsePostParams => {
  const match = validateFormat(msg, postType);
  const model: string = match[1].trim();
  const price: number = Number(match[2]) * 10000;
  const content: string = match[3].trim();

  const postData = {
    messageId: msg.id,
    createdAt: msg.createdAt,
    categoryId: _.get(botConfig, `${type}.allowedChannelIdToCategoryId.${msg.channelId}`, ''),
    type: postType,
    title: model,
    price: price,
    content: content
  };
  return postData;
};

const parseTradeMessage = (msg: Message): parsePostParams => {
  const match = validateFormat(msg, 'trade');
  const mine: string = match[1].trim();
  const yours: string = match[2].trim();
  const content: string = match[3].trim();

  const postData = {
    messageId: msg.id,
    createdAt: msg.createdAt,
    categoryId: _.get(botConfig, `wtt.allowedChannelIdToCategoryId.${msg.channelId}`, ''),
    type: 'trade',
    title: mine,
    subTitle: yours,
    price: 0,
    content: content
  };
  return postData;
};

const parseImages = (msg: Message): parseImageParams[] => {
  let init: parseImageParams[] = [];
  return msg.attachments.reduce((images, attachment) => {
    if (! attachment.url) return images;
    const image = _.pick(attachment, [ 'name', 'size', 'url', 'height', 'width']);
    images.push(image);
    return images;
  }, init);
};

interface parsePostParams {
  messageId: string,
  createdAt: Date,
  categoryId: string,
  type: string,
  title: string,
  price: number,
  content: string,
  subTitle?: string,
};

interface parseImageParams {
  name: string,
  size: number,
  url: string,
  height: number | null,
  width: number | null
};

enum EventType {
  create,
  update
};

export {
  savePostFromMessage,
  updatePostFromMessage,
  deletePostFromMessage,
  bulkSavePosts,
  upsertPost
};