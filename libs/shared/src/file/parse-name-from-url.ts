export const parseNameFromURL = (url: string) => {
  const re = /\/([^?/]+)(?=\?|$)/;
  const match = re.exec(url);
  if (!match) throw new Error('INVALID_URL_FORMAT');
  return match[1];
};
