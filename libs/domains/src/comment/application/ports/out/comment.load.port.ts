import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface CommentLoadPort extends LoadPort<CommentEntity> {}
