import { AggregateRoot } from '@nestjs/cqrs';
import _ from 'lodash';
import { UpdateRoleProps } from './role.types';

export class RoleEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  position: number;

  hexColor: string = '#000000';

  guildId: string;

  constructor(partial: Partial<RoleEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateRoleProps) {
    Object.assign(this, _.pickBy(props, _.identity));
  }
}
