import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserGetByIdQuery } from './user.get-by-id.query';
import { UserLoadPort } from '../../port/out/user.load.port';

@QueryHandler(UserGetByIdQuery)
export class UserGetByIdHandler implements IQueryHandler<UserGetByIdQuery> {
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: UserGetByIdQuery): Promise<UserEntity | null> {
    return this.userLoadPort.getById(query.id);
  }
}
