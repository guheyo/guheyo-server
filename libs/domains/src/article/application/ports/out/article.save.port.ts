import { ArticleEntity } from '@lib/domains/article/domain/article.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface ArticleSavePort extends SavePort<ArticleEntity> {}
