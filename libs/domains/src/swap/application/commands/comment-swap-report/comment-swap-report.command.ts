import { ICommand } from '@nestjs/cqrs/dist';
import { CommentSwapReportInput } from './comment-swap-report.input';

export class CommentSwapReportCommand implements ICommand {
  input: CommentSwapReportInput;

  constructor(input: CommentSwapReportInput) {
    this.input = input;
  }
}
