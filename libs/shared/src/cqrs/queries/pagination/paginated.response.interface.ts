import { IEdge } from './edge.interface';
import { PageInfo } from './page-info';

export interface IPaginatedResponse<T> {
  edges: IEdge<T>[];

  pageInfo: PageInfo;
}
