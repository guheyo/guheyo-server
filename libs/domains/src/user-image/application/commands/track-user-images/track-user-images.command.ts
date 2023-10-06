import { ICommand } from '@nestjs/cqrs';
import { TrackUserImagesArgs } from './track-user-images.args';

export class TrackUserImagesCommand implements ICommand {
  type: string;

  refId: string;

  constructor(args: TrackUserImagesArgs) {
    this.type = args.type;
    this.refId = args.refId;
  }
}
