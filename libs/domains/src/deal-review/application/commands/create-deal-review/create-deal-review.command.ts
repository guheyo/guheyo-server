import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateDealReviewInput } from './create-deal-review.input';

export class CreateDealReviewCommand implements ICommand {
  id: string;

  type: string;

  refId: string;

  refVersionId: string;

  authorId: string;

  revieweeId: string;

  groupId: string;

  rating: number;

  title: string;

  content?: string;

  mannerTagIds: string[];

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateDealReviewInput; user: MyUserResponse }) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.refVersionId = input.refVersionId;
    this.authorId = input.authorId;
    this.revieweeId = input.revieweeId;
    this.groupId = input.groupId;
    this.rating = input.rating;
    this.title = input.title;
    this.content = input.content;
    this.mannerTagIds = input.mannerTagIds;
    this.user = user;
  }
}
