export class PlatformService {
  parsePlatformName(url: string) {
    if (/https?:\/\/(www\.)?smartstore\.naver\.com(\/|$)/.test(url)) return '스마트스토어';
    if (/https?:\/\/(www\.)?instagram\.com(\/|$)/.test(url)) return '인스타그램';
    if (/https?:\/\/(www\.)?discord\.com(\/|$)/.test(url)) return '디스코드';
    if (/https?:\/\/(www\.)?x\.com(\/|$)/.test(url)) return 'X';
    return '웹사이트';
  }
}
