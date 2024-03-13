import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { ReportResponse } from './report.response';

@ObjectType()
export class ReportWithAuthorResponse extends ReportResponse {
  @Field(() => AuthorResponse)
  author: AuthorResponse;

  constructor(partial: Partial<ReportWithAuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
