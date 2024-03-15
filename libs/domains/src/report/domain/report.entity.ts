import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { pick } from 'lodash';
import { ReportCreatedEvent } from '../application/events/report-created/report-created.event';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  offerId: string | null;

  demandId: string | null;

  swapId: string | null;

  status: string;

  authorId: string;

  title: string;

  content: string | null;

  comments: CommentEntity[];

  constructor(partial: Partial<ReportEntity>) {
    super();
    Object.assign(this, partial);
    this.status = 'open';
  }

  create(refId: string) {
    this.apply(
      new ReportCreatedEvent({
        ...pick(this, ['id', 'type']),
        refId,
      }),
    );
  }
}
