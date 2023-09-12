import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';

export function paginated<T>(classRef: Type<T>): any {
  @ObjectType()
  class PaginationResponse {
    @Field(() => [classRef])
    nodes: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return PaginationResponse;
}
