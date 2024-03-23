import { ICommand } from '@nestjs/cqrs/dist';
import { CommentReportInput } from './comment-report.input';

export class CommentReportCommand implements ICommand {
  input: CommentReportInput;

  constructor(input: CommentReportInput) {
    this.input = input;
  }
}
