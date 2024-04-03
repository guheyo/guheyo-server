import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateRoleProps } from './role.types';

export class RoleEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  position: number;

  hexColor: string = '#7f838e';

  groupId: string;

  constructor(partial: Partial<RoleEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateRoleProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
