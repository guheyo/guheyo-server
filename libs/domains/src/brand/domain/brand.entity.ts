import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { LinkEntity } from './link.entity';

export class BrandEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  slug: string | null;

  description: string | null;

  logo: string | null;

  groupIds: string[];

  groups: GroupEntity[];

  links: LinkEntity[];

  constructor(partial: Partial<BrandEntity>) {
    super();
    Object.assign(this, partial);
  }
}
