import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserGetByIdQuery } from './user.get-by-id.query';
import { UserLoadPort } from '../../port/out/user.load.port';
import { UserResponse } from '../response/user.response';

@QueryHandler(UserGetByIdQuery)
export class UserGetByIdHandler implements IQueryHandler<UserGetByIdQuery> {
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: UserGetByIdQuery): Promise<UserResponse | null> {
    return this.userLoadPort.getById(query.id);
  }
}
