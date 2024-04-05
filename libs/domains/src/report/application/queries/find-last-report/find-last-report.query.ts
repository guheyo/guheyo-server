import { IQuery } from '@nestjs/cqrs';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';

export class FindLastReportQuery implements IQuery {
  user: UserResponse;

  constructor({ user }: { user: UserResponse }) {
    this.user = user;
  }
}
