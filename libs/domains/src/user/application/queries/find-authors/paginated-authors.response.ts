import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { AuthorResponse } from '../../dtos/author.response';

@ObjectType()
export class PaginatedAuthorsResponse extends paginated<AuthorResponse>(AuthorResponse) {}
