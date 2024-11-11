import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateGroupProps } from './group.types';
import { GroupStatus } from './group.enums';

export class GroupEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  slug?: string;

  description: string | null;

  icon: string | null;

  position: number;

  status: GroupStatus;

  roles: RoleEntity[];

  constructor(partial: Partial<GroupEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateGroupProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
