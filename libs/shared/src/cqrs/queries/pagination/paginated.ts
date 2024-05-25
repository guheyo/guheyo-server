// eslint-disable-next-line max-classes-per-file
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';
import { IPaginatedResponse } from './paginated.response.interface';
import { IEdge } from './edge.interface';

export function paginated<T>(classRef: Type<T> | any, name?: string): Type<IPaginatedResponse<T>> {
  @ObjectType(`${name || classRef.name}Edge`, { isAbstract: true })
  abstract class Edge implements IEdge<T> {
    @Field(() => classRef)
    node: T;

    @Field()
    cursor: string;
  }

  @ObjectType()
  abstract class PaginatedResponse implements IPaginatedResponse<T> {
    @Field(() => [Edge])
    edges: Edge[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return PaginatedResponse as Type<IPaginatedResponse<T>>;
}
