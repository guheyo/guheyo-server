import { FindArticlePreviewsHandler } from './find-article-previews/find-article-previews.handler';
import { FindArticleHandler } from './find-article/find-article.handler';

export const ARTICLE_QUERY_PROVIDERS = [FindArticlePreviewsHandler, FindArticleHandler];
