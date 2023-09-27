import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import _ from 'lodash';
import { UpdateGuildProps } from './guild.types';

export class GuildEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  description: string | null;

  icon: string | null;

  rank: number | null;

  roles: RoleEntity[];

  constructor(partial: Partial<GuildEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateGuildProps) {
    Object.assign(this, _.pickBy(props, _.identity));
  }
}
