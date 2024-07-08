export const parseFollowedBySearcher = (keyword: string | undefined) =>
  keyword
    ? {
        search: keyword.split(' ').join(' <-> '),
      }
    : undefined;

export const parseContainsSearcher = ({
  keyword,
  mode = 'insensitive',
}: {
  keyword: string | undefined;
  mode?: 'default' | 'insensitive';
}) =>
  keyword
    ? {
        contains: keyword,
        mode,
      }
    : undefined;
