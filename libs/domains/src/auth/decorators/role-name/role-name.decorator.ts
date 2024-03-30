import { Reflector } from '@nestjs/core';

export const RoleName = Reflector.createDecorator<string>();
