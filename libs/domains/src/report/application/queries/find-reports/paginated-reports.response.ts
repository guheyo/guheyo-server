import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { ReportResponse } from '../../dtos/report.response';

@ObjectType()
export class PaginatedReportsResponse extends paginated<ReportResponse>(ReportResponse) {}
