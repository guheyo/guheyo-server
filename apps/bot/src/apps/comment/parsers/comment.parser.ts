import { Injectable } from '@nestjs/common';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { Message } from 'discord.js';
import { CreateCommentInput } from '@lib/domains/comment/application/commands/create-comment/create-comment.input';
import { UpdateCommentInput } from '@lib/domains/comment/application/commands/update-comment/update-comment.input';
import { GroupParser } from '../../group/parsers/group.parser';
import { MessageWithUser } from '../../user/interfaces/user.interfaces';

@Injectable()
export class CommentParser extends GroupParser {
  parseCreateCommentCommands(messageWithUsers: MessageWithUser[]): CreateCommentCommand[] {
    return messageWithUsers.map((messageWithUser) => ({
      ...this.parseCreateCommentInput(messageWithUser.message),
      user: messageWithUser.user,
    }));
  }

  parseCreateCommentInput(message: Message): CreateCommentInput {
    return {
      id: this.parseIdFromMessageId(message.id),
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      postId: this.parseIdFromChannelId(message.channelId),
      content: message.content,
      pinned: message.pinned,
    };
  }

  parseUpdateCommentInput(message: Message): UpdateCommentInput {
    return {
      id: this.parseIdFromMessageId(message.id),
      content: message.content,
      pinned: message.pinned,
    };
  }
}
