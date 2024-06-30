import { CreateArticleHandler } from './create-article/create-article.handler';
import { DeleteArticleHandler } from './delete-article/delete-article.handler';

export const ARTICLE_COMMAND_PROVIDERS = [CreateArticleHandler, DeleteArticleHandler];
