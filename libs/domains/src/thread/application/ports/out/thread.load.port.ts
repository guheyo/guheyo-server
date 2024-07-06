import { ThreadEntity } from '@lib/domains/thread/domain/thread.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface ThreadLoadPort extends LoadPort<ThreadEntity> {}
