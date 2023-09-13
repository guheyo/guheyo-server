import { IEdge } from './edge.interface';
import { PageInfo } from './page-info';

export interface IPaginationResponse<T> {
  edges: IEdge<T>[];

  pageInfo: PageInfo;
}
