import { IPaginatedResponse } from './paginated.response.interface';

export function paginate<T = Record<string, any>>(
  nodes: T[],
  cursorKey: keyof T,
  take: number,
): IPaginatedResponse<T> {
  const hasNextPage = nodes.length > take;
  const edges = (hasNextPage ? nodes.slice(0, -1) : nodes).map((node) => ({
    node,
    cursor: node[cursorKey] as string,
  }));

  return {
    edges,
    pageInfo: {
      endCursor: edges[edges.length - 1]?.cursor || null,
      hasNextPage,
    },
  };
}
