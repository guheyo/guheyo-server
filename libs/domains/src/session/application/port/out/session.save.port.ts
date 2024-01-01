import { SessionEntity } from '@lib/domains/session/domain/session.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface SessionSavePort extends SavePort<SessionEntity> {}
