import { Field, ObjectType } from '@nestjs/graphql';
import { ReportPreviewResponse } from './report-preview.response';
import { ReportCommentResponse } from './report-comment.response';

@ObjectType()
export class ReportResponse extends ReportPreviewResponse {
  @Field(() => [ReportCommentResponse])
  comments: ReportCommentResponse[];

  constructor(partial: Partial<ReportResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
