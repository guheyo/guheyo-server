import { ArticleEntity } from '@lib/domains/article/domain/article.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface ArticleLoadPort extends LoadPort<ArticleEntity> {}
