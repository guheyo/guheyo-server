import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class UserImageClient {
  constructor(private readonly commandBus: CommandBus) {}

  // TODO
}
