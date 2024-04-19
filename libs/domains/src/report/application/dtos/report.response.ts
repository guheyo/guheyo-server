import { Field, ObjectType } from '@nestjs/graphql';
import { VersionResponse } from '@lib/domains/version/application/dtos/version.response';
import { ReportPreviewResponse } from './report-preview.response';
import { ReportCommentResponse } from './report-comment.response';

@ObjectType()
export class ReportResponse extends ReportPreviewResponse {
  @Field(() => [ReportCommentResponse])
  comments: ReportCommentResponse[];

  @Field(() => VersionResponse)
  version: VersionResponse;

  constructor(partial: Partial<ReportResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
