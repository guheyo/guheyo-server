import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { LinkEntity } from './link.entity';

export interface UpdateBrandProps {
  id: string;

  name?: string;

  slug?: string;

  description?: string;

  logo?: string;

  groups?: GroupEntity[];

  links?: LinkEntity[];
}
