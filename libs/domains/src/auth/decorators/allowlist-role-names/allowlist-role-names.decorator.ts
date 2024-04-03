import { Reflector } from '@nestjs/core';

export const AllowlistRoleNames = Reflector.createDecorator<string[]>();
