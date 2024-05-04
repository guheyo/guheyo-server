import { ReactionEntity } from '@lib/domains/reaction/domain/reaction.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface ReactionSavePort extends SavePort<ReactionEntity> {}
