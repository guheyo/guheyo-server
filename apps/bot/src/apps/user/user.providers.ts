import { UserClient } from './clients/user.client';
import { UserParser } from './parsers/user.parser';

export const BOT_USER_PROVIDERS = [UserClient, UserParser];
