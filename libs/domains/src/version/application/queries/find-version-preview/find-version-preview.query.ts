import { IQuery } from '@nestjs/cqrs';
import { FindVersionPreviewArgs } from './find-version-preview.args';

export class FindVersionPreviewQuery implements IQuery {
  id?: string;

  refId?: string;

  constructor(args: FindVersionPreviewArgs) {
    this.id = args.id;
    this.refId = args.refId;
  }
}
