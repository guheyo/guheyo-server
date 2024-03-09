import { Reflector } from '@nestjs/core';

export const AuthorIdPath = Reflector.createDecorator<string>();
