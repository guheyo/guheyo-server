import { Injectable } from '@nestjs/common';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { GroupParser } from '../../group/parsers/group.parser';
import { MessageWithUser } from '../../user/interfaces/user.interfaces';

@Injectable()
export class CommentParser extends GroupParser {
  parseCreateCommentCommands(messageWithUsers: MessageWithUser[]): CreateCommentCommand[] {
    return messageWithUsers.map((messageWithUser) => ({
      id: this.parseIdFromMessage(messageWithUser.message),
      postId: this.parsePostIdFromMessage(messageWithUser.message),
      content: messageWithUser.message.content,
      user: messageWithUser.user,
    }));
  }
}
