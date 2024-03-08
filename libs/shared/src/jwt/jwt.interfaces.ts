export interface Profile {
  id: string;
  username: string;
  provider: string;
  socialId: string;
  avatarURL?: string;
}

export interface AuthUser extends Profile {
  iat: number;
  exp: number;
}
