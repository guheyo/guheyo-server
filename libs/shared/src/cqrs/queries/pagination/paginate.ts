import { IPaginationResponse } from './pagination.response.interface';

export function paginate<T = Record<string, any>>(
  nodes: T[],
  cursorKey: keyof T,
  take: number,
): IPaginationResponse<T> {
  const edges = nodes.map((node) => ({
    node,
    cursor: node[cursorKey] as string,
  }));

  return {
    edges,
    pageInfo: {
      endCursor: nodes.length ? (nodes.slice(-1)[0][cursorKey] as string) : null,
      hasNextPage: nodes.length < take,
    },
  };
}
