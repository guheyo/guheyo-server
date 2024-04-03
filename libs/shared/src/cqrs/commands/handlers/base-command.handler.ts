import { Type } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';

export abstract class BaseCommandHandler<T extends ICommand, TRes> implements ICommandHandler<T> {
  constructor(protected readonly Response: Type<TRes>) {}

  abstract execute(command: T): Promise<any>;

  parseResponse(model: Object) {
    return plainToClass(this.Response, model);
  }

  parseResponses(models: Object[]) {
    return models.map((model) => plainToClass(this.Response, model));
  }
}
