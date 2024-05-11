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
      id: this.parseIdFromMessage(messageWithUser.message),
      createdAt: messageWithUser.message.createdAt,
      updatedAt: messageWithUser.message.editedAt || messageWithUser.message.createdAt,
      postId: this.parseIdFromChannel(threadChannel),
      content: messageWithUser.message.content,
      user: messageWithUser.user,
    }));
  }
}
