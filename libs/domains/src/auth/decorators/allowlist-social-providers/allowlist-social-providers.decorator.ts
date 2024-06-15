import { Reflector } from '@nestjs/core';

export const AllowlistSocialProviders = Reflector.createDecorator<string[]>();
