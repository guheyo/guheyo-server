import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindMyUserByIdQuery } from './find-my-user-by-id.query';
import { UserReponse } from '../../dtos/user.reponse';
import { UserLoadPort } from '../../port/out/user.load.port';

@QueryHandler(FindMyUserByIdQuery)
export class FindMyUserByIdHandler implements IQueryHandler<FindMyUserByIdQuery> {
  constructor(@Inject('UserLoadPort') private userLoadPort: UserLoadPort) {}

  async execute(query: FindMyUserByIdQuery): Promise<UserReponse | null> {
    return this.userLoadPort.findMyUserById(query);
  }
}
