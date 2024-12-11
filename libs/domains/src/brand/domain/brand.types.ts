import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { CategoryEntity } from '@lib/domains/group/domain/category.entity';
import { LinkEntity } from './link.entity';

export interface UpdateBrandProps {
  name?: string;

  slug?: string;

  description?: string;

  logo?: string;

  groups?: GroupEntity[];

  categories: CategoryEntity[];

  links?: LinkEntity[];
}
