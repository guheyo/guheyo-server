import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { CategoryResponse } from '../../dtos/category.response';

@ObjectType()
export class PaginatedCategoriesResponse extends paginated<CategoryResponse>(CategoryResponse) {}
