import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MultiPlatformGuard implements CanActivate {
  constructor(private readonly platform: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let socialAuthGuard;
    if (this.platform === 'naver') {
      socialAuthGuard = new (AuthGuard('naver'))();
    } else if (this.platform === 'kakao') {
      socialAuthGuard = new (AuthGuard('kakao'))();
    } else {
      throw new Error('Unsupported platform');
    }

    const socialResult = await socialAuthGuard.canActivate(context);
    const socialUser = request.user;

    const jwtUserAuthGuard = new (AuthGuard('jwt-user'))();
    const jwtUserResult = await jwtUserAuthGuard.canActivate(context);
    const jwtUser = request.user;

    if (socialResult && jwtUserResult) {
      request.user = {
        ...jwtUser,
        socialData: {
          [`${this.platform}`]: socialUser,
        },
      };
      return true;
    }

    return false;
  }
}
