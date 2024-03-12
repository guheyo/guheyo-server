import { IQuery } from '@nestjs/cqrs';
import { FindGroupArgs } from './find-group.args';

export class FindGroupQuery implements IQuery {
  id?: string;

  slug?: string;

  constructor(args: FindGroupArgs) {
    this.id = args.id;
    this.slug = args.slug;
  }
}
