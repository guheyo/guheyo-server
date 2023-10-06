import { IEvent } from '@nestjs/cqrs';
import { TrackUserImagesArgs } from './track-user-images.args';

export class TrackUserImagesEvent implements IEvent {
  type: string;

  refId: string;

  constructor(args: TrackUserImagesArgs) {
    this.type = args.type;
    this.refId = args.refId;
  }
}
