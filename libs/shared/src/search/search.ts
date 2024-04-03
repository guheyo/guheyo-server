export const parseFollowedBySearcher = (keyword: string | undefined) =>
  keyword
    ? {
        search: keyword.split(' ').join(' <-> '),
      }
    : undefined;
