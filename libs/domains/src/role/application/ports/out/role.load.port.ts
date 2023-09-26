import { RoleEntity } from '@lib/domains/member/domain/role.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface RoleLoadPort extends LoadPort<RoleEntity> {}
