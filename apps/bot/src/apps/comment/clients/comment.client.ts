import { Injectable, Logger } from '@nestjs/common';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { CreateCommentsCommand } from '@lib/domains/comment/application/commands/create-comments/create-comments.command';
import { CreateCommentInput } from '@lib/domains/comment/application/commands/create-comment/create-comment.input';
import { Message } from 'discord.js';
import { COMMENT } from '@lib/domains/comment/domain/comment.constants';
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

  async createCommentsFromMessageWithUsers(messageWithUsers: MessageWithUser[]) {
    const uploadPromises = messageWithUsers.map(async (messageWithUser) => {
      const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
        messageWithUser.message,
        COMMENT,
      );
      return this.uploadAndCreateAttachments(
        messageWithUser.user,
        uploadUserImageInputList,
        COMMENT,
      );
    });
    await Promise.all(uploadPromises);

    const commentCommands = this.commentParser.parseCreateCommentCommands(messageWithUsers);
    await this.createComments(commentCommands);
    this.logger.log(`comment<#${commentCommands.length}> created`);
  }

  async createCommentFromMessage(message: Message, user: MyUserResponse) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      message,
      COMMENT,
    );
    const createCommentInput = this.commentParser.parseCreateCommentInput(message);

    await this.uploadAndCreateAttachments(user, uploadUserImageInputList, COMMENT);
    await this.createComment({ input: createCommentInput, user });
    this.logger.log(`comment<#${createCommentInput.id}> created`);
  }
}
