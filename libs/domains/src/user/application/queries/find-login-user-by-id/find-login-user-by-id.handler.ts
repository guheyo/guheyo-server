import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindLoginUserByIdQuery } from './find-login-user-by-id.query';
import { UserReponse } from '../../dtos/user.reponse';
import { UserLoadPort } from '../../port/out/user.load.port';

@QueryHandler(FindLoginUserByIdQuery)
export class FindLoginUserByIdHandler implements IQueryHandler<FindLoginUserByIdQuery> {
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: FindLoginUserByIdQuery): Promise<UserReponse | null> {
    return this.userLoadPort.findLoginUserById(query);
  }
}
