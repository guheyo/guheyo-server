import { ArticleRepository } from './adapter/out/persistence/article.repository';
import { ARTICLE_COMMAND_PROVIDERS } from './application/commands/article.command.providers';
import { ARTICLE_QUERY_PROVIDERS } from './application/queries/article.query.providers';
import { ArticleSagas } from './application/sagas/article.sagas';

export const ARTICLE_REVIEW_PROVIDERS = [
  {
    provide: 'ArticleLoadPort',
    useClass: ArticleRepository,
  },
  {
    provide: 'ArticleSavePort',
    useClass: ArticleRepository,
  },
  ...ARTICLE_QUERY_PROVIDERS,
  ...ARTICLE_COMMAND_PROVIDERS,
  ArticleSagas,
];
