import { IQuery } from '@nestjs/cqrs';
import { FindAuthorArgs } from './find-author.args';

export class FindAuthorQuery implements IQuery {
  id: string;

  constructor(args: FindAuthorArgs) {
    this.id = args.id;
  }
}
