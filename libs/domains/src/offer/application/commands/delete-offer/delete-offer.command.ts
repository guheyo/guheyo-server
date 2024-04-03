import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteOfferArgs } from './delete-offer.args';

export class DeleteOfferCommand implements ICommand {
  id: string;

  sellerId: string;

  user: MyUserResponse;

  constructor({ args, user }: { args: DeleteOfferArgs; user: MyUserResponse }) {
    this.id = args.id;
    this.sellerId = args.sellerId;
    this.user = user;
  }
}
