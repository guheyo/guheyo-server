import { IQuery } from '@nestjs/cqrs';
import { FindUserImagesOfRefArgs } from './find-user-images-of-ref.args';

export class FindUserImagesOfRefQuery implements IQuery {
  type: string;

  refId: string;

  constructor(args: FindUserImagesOfRefArgs) {
    this.type = args.type;
    this.refId = args.refId;
  }
}
