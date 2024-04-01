import { IsUUID } from 'class-validator';

export class CheckReportedUserInput {
  @IsUUID()
  reportId: string;
}
