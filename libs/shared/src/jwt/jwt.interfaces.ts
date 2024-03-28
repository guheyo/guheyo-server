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
}

export interface JwtPayload extends UserPayload {
  iat: number;
  exp: number;
}
