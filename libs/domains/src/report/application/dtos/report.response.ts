import { CommentResponse } from '@lib/domains/comment/application/dtos/comment.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { ReportPreviewResponse } from './report-preview.response';

@ObjectType()
export class ReportResponse extends ReportPreviewResponse {
  @Field(() => [CommentResponse])
  comments: CommentResponse[];

  constructor(partial: Partial<ReportResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
