import { RoleEntity } from './role.entity';
import { MemberEntity } from './member.entity';

export class MemberWithRolesEntity extends MemberEntity {
  roles: RoleEntity[];

  constructor(partial: Partial<MemberEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
