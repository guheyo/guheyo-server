import { ICommand } from '@nestjs/cqrs/dist';
import { CommentDemandReportInput } from './comment-demand-report.input';

export class CommentDemandReportCommand implements ICommand {
  input: CommentDemandReportInput;

  constructor(input: CommentDemandReportInput) {
    this.input = input;
  }
}
