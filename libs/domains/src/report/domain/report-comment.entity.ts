import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { UpdateReportCommentProps } from './report.interfaces';

export class ReportCommentEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  userId: string;

  reportId: string;

  content: string;

  userAgent: string | null;

  ipAddress: string | null;

  constructor(partial: Partial<ReportCommentEntity>) {
    super();
    Object.assign(this, partial);
  }

  isAuthorized(userId: string) {
    return this.userId === userId;
  }

  update(props: UpdateReportCommentProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
