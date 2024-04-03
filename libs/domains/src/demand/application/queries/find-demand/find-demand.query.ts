import { IQuery } from '@nestjs/cqrs';
import { FindDemandArgs } from './find-demand.args';

export class FindDemandQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindDemandArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
