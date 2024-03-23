import { Field, ObjectType } from '@nestjs/graphql';
import { ReportResponse } from '@lib/domains/report/application/dtos/report.response';
import { VersionResponse } from './version.response';

@ObjectType()
export class VersiontWithReportResponse extends VersionResponse {
  @Field(() => [ReportResponse])
  reports: ReportResponse[];

  constructor(partial: Partial<VersiontWithReportResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
