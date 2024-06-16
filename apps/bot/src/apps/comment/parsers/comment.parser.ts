import { Injectable } from '@nestjs/common';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { ThreadChannel } from 'discord.js';
import { GroupParser } from '../../group/parsers/group.parser';
import { MessageWithUser } from '../../user/interfaces/user.interfaces';

@Injectable()
export class CommentParser extends GroupParser {
  parseCreateCommentCommands(
    threadChannel: ThreadChannel,
    messageWithUsers: MessageWithUser[],
  ): CreateCommentCommand[] {
    return messageWithUsers.map((messageWithUser) => ({
      id: this.parseIdFromMessageId(messageWithUser.message.id),
      createdAt: messageWithUser.message.createdAt,
      updatedAt: messageWithUser.message.editedAt || messageWithUser.message.createdAt,
      postId: this.parseIdFromChannelId(threadChannel.id),
      content: messageWithUser.message.content,
      user: messageWithUser.user,
    }));
  }

  parseEmbedWithUsers(messageWithUsers: MessageWithUser[]) {
    return messageWithUsers
      .map((messageWithUser) => ({
        messageId: messageWithUser.message.id,
        embed: messageWithUser.message.embeds[0],
        user: messageWithUser.user,
      }))
      .filter((embedWithUser) => !!embedWithUser.embed);
  }
}
