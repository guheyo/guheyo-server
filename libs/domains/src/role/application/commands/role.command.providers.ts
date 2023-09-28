import { RoleRepository } from '../../adapter/out/persistence/role.repository';
import { CreateRoleHandler } from './create-role/create-role.handler';
import { UpdateRoleHandler } from './update-role/update-role.handler';
import { DeleteRoleHandler } from './delete-role/delete-role.handler';
import { UpsertRolesHandler } from './upsert-roles/upsert-roles.handler';

export const ROLE_COMMAND_PROVIDERS = [
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  UpsertRolesHandler,
  {
    provide: 'RoleLoadPort',
    useClass: RoleRepository,
  },
  {
    provide: 'RoleSavePort',
    useClass: RoleRepository,
  },
];
