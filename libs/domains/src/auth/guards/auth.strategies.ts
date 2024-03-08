import { DiscordStrategy } from './discord/discord.strategy';
import { JwtAccessStrategy } from './jwt/jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { NaverStrategy } from './naver/naver.strategy';

export const AUTH_STRATEGIES = [
  DiscordStrategy,
  JwtAccessStrategy,
  JwtRefreshStrategy,
  NaverStrategy,
];
