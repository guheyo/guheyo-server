import { Injectable, Logger } from '@nestjs/common';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { CreateCommentsCommand } from '@lib/domains/comment/application/commands/create-comments/create-comments.command';
import { CreateCommentInput } from '@lib/domains/comment/application/commands/create-comment/create-comment.input';
import { ThreadChannel } from 'discord.js';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { CommentParser } from '../parsers/comment.parser';
import { MessageWithUser } from '../../user/interfaces/user.interfaces';

@Injectable()
export class CommentClient extends UserImageClient {
  constructor(protected readonly commentParser: CommentParser) {
    super();
  }

  private readonly logger = new Logger(CommentClient.name);

  async createComment({ input, user }: { input: CreateCommentInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateCommentCommand({ input, user }));
  }

  async createComments(commentCommands: CreateCommentCommand[]) {
    await this.commandBus.execute(new CreateCommentsCommand(commentCommands));
  }

  async createCommentsFromMessageWithUsers(
    threadChannel: ThreadChannel,
    messageWithUsers: MessageWithUser[],
  ) {
    const commentCommands = this.commentParser.parseCreateCommentCommands(
      threadChannel,
      messageWithUsers,
    );
    await this.createComments(commentCommands);
    this.logger.log(`comment<@${commentCommands.length}> created`);
  }
}
