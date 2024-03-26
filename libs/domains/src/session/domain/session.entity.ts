import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateSessionProps } from './session.types';

export class SessionEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  sessionToken: string;

  expires: Date;

  userId: string;

  constructor(partial: Partial<SessionEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateSessionProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
