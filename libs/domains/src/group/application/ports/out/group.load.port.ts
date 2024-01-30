import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface GroupLoadPort extends LoadPort<GroupEntity> {}
