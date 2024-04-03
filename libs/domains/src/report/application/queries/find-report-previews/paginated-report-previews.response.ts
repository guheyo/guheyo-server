import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { ReportPreviewResponse } from '../../dtos/report-preview.response';

@ObjectType()
export class PaginatedReportPreviewsResponse extends paginated<ReportPreviewResponse>(
  ReportPreviewResponse,
) {}
