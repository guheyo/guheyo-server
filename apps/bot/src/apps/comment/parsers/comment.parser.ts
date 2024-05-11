import { Injectable } from '@nestjs/common';
import { CreateCommentsCommand } from '@lib/domains/comment/application/commands/create-comments/create-comments.command';
import { GroupParser } from '../../group/parsers/group.parser';
import { MessageWithUser } from '../../user/interfaces/user.interfaces';

@Injectable()
export class CommentParser extends GroupParser {
  parseCreateCommentsCommand(messageWithUsers: MessageWithUser[]): CreateCommentsCommand {
    return {
      commentCommands: messageWithUsers.map((messageWithUser) => ({
        id: this.parseIdFromMessage(messageWithUser.message),
        postId: this.parsePostIdFromMessage(messageWithUser.message),
        content: messageWithUser.message.content,
        user: messageWithUser.user,
      })),
    };
  }
}
