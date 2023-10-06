import { ICommand } from '@nestjs/cqrs';
import { UntrackUserImagesArgs } from './untrack-user-images.args';

export class UntrackUserImagesCommand implements ICommand {
  type: string;

  refId: string;

  constructor(args: UntrackUserImagesArgs) {
    this.type = args.type;
    this.refId = args.refId;
  }
}
