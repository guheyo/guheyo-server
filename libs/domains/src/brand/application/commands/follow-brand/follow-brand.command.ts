import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FollowBrandInput } from './follow-brand.input';

export class FollowBrandCommand implements ICommand {
  brandId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: FollowBrandInput; user: MyUserResponse }) {
    this.brandId = input.brandId;
    this.user = user;
  }
}
