import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { UserResponse } from '../../dtos/user.response';

@ObjectType()
export class PaginatedUsersResponse extends paginated<UserResponse>(UserResponse) {}
