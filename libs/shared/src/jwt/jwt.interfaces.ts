import { MemberRole } from '@lib/domains/member/domain/member.interfaces';

export interface SocialProfile {
  id: string;
  username: string;
  provider: string;
  avatarURL?: string;
}

export interface UserPayload {
  socialProfile: SocialProfile;
  id: string;
  username: string;
  avatarURL?: string;
  memberRoles: MemberRole[];
}

export interface JwtPayload extends UserPayload {
  iat: number;
  exp: number;
}
