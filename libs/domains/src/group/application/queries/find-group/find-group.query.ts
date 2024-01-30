import { IQuery } from '@nestjs/cqrs';
import { FindGroupArgs } from './find-group.args';

export class FindGroupQuery implements IQuery {
  public readonly slug?: string;

  constructor({ slug }: FindGroupArgs) {
    this.slug = slug;
  }
}
