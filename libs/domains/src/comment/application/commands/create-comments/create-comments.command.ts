import { ICommand } from '@nestjs/cqrs/dist';
import { CreateCommentCommand } from '../create-comment/create-comment.command';

export class CreateCommentsCommand implements ICommand {
  constructor(public readonly commentCommands: CreateCommentCommand[]) {}
}
