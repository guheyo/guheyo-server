import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface RoleSavePort extends SavePort<RoleEntity> {}
