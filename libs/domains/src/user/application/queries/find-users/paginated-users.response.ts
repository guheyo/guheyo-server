import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { UserReponse } from '../../dtos/user.reponse';

@ObjectType()
export class PaginatedUsersResponse extends paginated<UserReponse>(UserReponse) {}
