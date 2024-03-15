import { ICommand } from '@nestjs/cqrs/dist';
import { CommentOfferReportInput } from './comment-offer-report.input';

export class CommentOfferReportCommand implements ICommand {
  input: CommentOfferReportInput;

  constructor(input: CommentOfferReportInput) {
    this.input = input;
  }
}
