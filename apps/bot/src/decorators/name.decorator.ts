import { Reflector } from '@nestjs/core';

export const Name = Reflector.createDecorator<string>();
