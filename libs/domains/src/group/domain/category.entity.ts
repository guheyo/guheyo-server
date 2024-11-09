import { RoleEntity } from '@lib/domains/role/domain/role.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateGroupProps } from './group.types';

export class CategoryEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  name: string;

  slug?: string;

  description: string | null;

  position: number;

  roles: RoleEntity[];

  constructor(partial: Partial<CategoryEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateGroupProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
