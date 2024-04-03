import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface GroupSavePort extends SavePort<GroupEntity> {}
