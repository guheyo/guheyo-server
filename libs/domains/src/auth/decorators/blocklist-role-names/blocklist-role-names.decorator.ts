import { Reflector } from '@nestjs/core';

export const BlocklistRoleNames = Reflector.createDecorator<string[]>();
