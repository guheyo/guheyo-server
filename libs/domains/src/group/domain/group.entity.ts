import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import _ from 'lodash';
import { UpdateGroupProps } from './group.types';

export class GroupEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  description: string | null;

  icon: string | null;

  position: number;

  roles: RoleEntity[];

  constructor(partial: Partial<GroupEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateGroupProps) {
    Object.assign(this, _.pickBy(props, _.identity));
  }
}
