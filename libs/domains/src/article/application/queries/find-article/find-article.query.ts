import { IQuery } from '@nestjs/cqrs';
import { FindArticleArgs } from './find-article.args';

export class FindArticleQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindArticleArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
