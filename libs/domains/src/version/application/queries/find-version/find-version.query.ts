import { IQuery } from '@nestjs/cqrs';
import { FindVersionArgs } from './find-version.args';

export class FindVersionQuery implements IQuery {
  id?: string;

  refId?: string;

  constructor(args: FindVersionArgs) {
    this.id = args.id;
    this.refId = args.refId;
  }
}
