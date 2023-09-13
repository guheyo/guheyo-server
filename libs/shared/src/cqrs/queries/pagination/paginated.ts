// eslint-disable-next-line max-classes-per-file
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';
import { IPaginationResponse } from './pagination.response.interface';
import { IEdge } from './edge.interface';

export function paginated<T>(classRef: Type<T>): Type<IPaginationResponse<T>> {
  @ObjectType()
  abstract class Edge implements IEdge<T> {
    @Field(() => classRef)
    node: T;

    @Field()
    cursor: string;
  }

  @ObjectType()
  abstract class PaginationResponse implements IPaginationResponse<T> {
    @Field(() => [Edge])
    edges: Edge[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return PaginationResponse as Type<IPaginationResponse<T>>;
}
