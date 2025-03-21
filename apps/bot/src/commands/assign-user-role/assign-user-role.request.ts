import { StringOption } from 'necord';

export class AssignUserRoleRequest {
  @StringOption({
    name: 'memberid',
    description: 'member id',
    required: true,
  })
  memberId: string;

  @StringOption({
    name: 'roleid',
    description: 'role id',
    required: true,
  })
  roleId: string;
}
