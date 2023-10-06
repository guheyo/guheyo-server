import { Type } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';

export abstract class BaseQueryHandler<T extends IQuery, TRes> implements IQueryHandler<T> {
  constructor(protected readonly Response: Type<TRes>) {}

  abstract execute(query: T): Promise<any>;

  parseResponse(model: Object | null) {
    return model ? plainToClass(this.Response, model) : null;
  }

  parseResponses(models: Object[]) {
    return models.map((model) => plainToClass(this.Response, model));
  }
}
