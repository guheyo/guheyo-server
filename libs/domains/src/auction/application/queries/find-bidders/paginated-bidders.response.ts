import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedBiddersResponse extends paginated<UserResponse>(UserResponse) {}
