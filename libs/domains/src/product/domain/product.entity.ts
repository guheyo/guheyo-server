import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateBrandProps } from './product.types';

export class ProductEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  name: string;

  description: string | null;

  brandId: string | null;

  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateBrandProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
