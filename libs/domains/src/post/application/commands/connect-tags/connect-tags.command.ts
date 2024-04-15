import { ICommand } from '@nestjs/cqrs/dist';
import { ConnectTagsInput } from './connect-tags.input';

export class ConnectTagsCommand implements ICommand {
  postId: string;

  tagIds: string[];

  constructor(input: ConnectTagsInput) {
    this.postId = input.postId;
    this.tagIds = input.tagIds;
  }
}
