import { IQuery } from '@nestjs/cqrs';
import { FindDemandArgs } from './find-demand.args';

export class FindDemandQuery implements IQuery {
  id?: string;

  slug?: string;

  constructor(findDemandArgs: FindDemandArgs) {
    this.id = findDemandArgs.id;
    this.slug = findDemandArgs.slug;
  }
}
