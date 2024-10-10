export class PlatformService {
  parsePlatformName(url: string) {
    if (/smartstore/.test(url)) return '스마트스토어';
    if (/instagram/.test(url)) return '인스타그램';
    if (/discord/.test(url)) return '디스코드';
    return '웹사이트';
  }
}
