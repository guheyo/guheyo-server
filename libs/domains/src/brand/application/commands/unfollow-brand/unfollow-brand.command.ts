import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UnfollowBrandInput } from './unfollow-brand.input';

export class UnfollowBrandCommand implements ICommand {
  brandId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UnfollowBrandInput; user: MyUserResponse }) {
    this.brandId = input.brandId;
    this.user = user;
  }
}
