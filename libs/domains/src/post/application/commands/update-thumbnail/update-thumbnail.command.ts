import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateThumbnailInput } from './update-thumbnail.input';

export class UpdateThumbnailCommand implements ICommand {
  postId: string;

  type: string;

  refId: string;

  constructor(input: UpdateThumbnailInput) {
    this.postId = input.postId;
    this.type = input.type;
    this.refId = input.refId;
  }
}
