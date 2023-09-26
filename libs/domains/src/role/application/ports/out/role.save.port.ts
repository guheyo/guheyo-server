import { RoleEntity } from '@lib/domains/member/domain/role.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface RoleSavePort extends SavePort<RoleEntity> {}
