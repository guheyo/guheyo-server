import { IQuery } from '@nestjs/cqrs';
import { FindGuildArgs } from './find-guild.args';

export class FindGuildQuery implements IQuery {
  public readonly slug?: string;

  constructor({ slug }: FindGuildArgs) {
    this.slug = slug;
  }
}
