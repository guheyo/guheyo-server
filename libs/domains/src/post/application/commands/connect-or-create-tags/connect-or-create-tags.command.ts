import { ICommand } from '@nestjs/cqrs/dist';
import { ConnectOrCreateTagsInput } from './connect-or-create-tags.input';

export class ConnectOrCreateTagsCommand implements ICommand {
  postId: string;

  type: string;

  tagNames: string[];

  constructor(input: ConnectOrCreateTagsInput) {
    this.postId = input.postId;
    this.type = input.type;
    this.tagNames = input.tagNames;
  }
}
