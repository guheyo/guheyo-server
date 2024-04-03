export interface UpdateSocialAccountProps {
  refreshToken?: string;

  accessToken?: string;

  expiresAt?: number;

  tokenType?: string;

  scope?: string;

  idToken?: string;

  sessionState?: string;
}
