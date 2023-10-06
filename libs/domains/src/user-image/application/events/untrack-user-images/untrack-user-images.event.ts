import { IEvent } from '@nestjs/cqrs';
import { UntrackUserImagesArgs } from './untrack-user-images.args';

export class UntrackUserImagesEvent implements IEvent {
  type: string;

  refId: string;

  constructor(args: UntrackUserImagesArgs) {
    this.type = args.type;
    this.refId = args.refId;
  }
}
