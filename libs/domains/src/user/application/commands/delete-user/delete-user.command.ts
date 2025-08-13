import { ICommand } from '@nestjs/cqrs';
import { MyUserResponse } from '../../dtos/my-user.response';

export class DeleteUserCommand implements ICommand {
  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    user,
    userAgent,
    ipAddress,
  }: {
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
