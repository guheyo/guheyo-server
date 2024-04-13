import { ICommand } from '@nestjs/cqrs/dist';
import { CheckPostReportsInput } from './check-post-reports.input';

export class CheckPostReportsCommand implements ICommand {
  postId: string;

  reportStatus: string;

  constructor(input: CheckPostReportsInput) {
    this.postId = input.postId;
    this.reportStatus = input.reportStatus;
  }
}
