import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { LinkEntity } from './link.entity';
import { UpdateBrandProps } from './brand.types';

export class BrandEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  name: string;

  slug: string | null;

  description: string | null;

  logo: string | null;

  groups: GroupEntity[];

  links: LinkEntity[];

  constructor(partial: Partial<BrandEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateBrandProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
