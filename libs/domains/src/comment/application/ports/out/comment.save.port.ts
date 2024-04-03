import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface CommentSavePort extends SavePort<CommentEntity> {}
