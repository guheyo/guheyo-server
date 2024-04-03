import { Injectable, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LoadPort } from '../ports/load.port';
import { SavePort } from '../ports/save.port';

@Injectable()
export abstract class BaseRepository<T> implements LoadPort<T>, SavePort<T> {
  constructor(protected readonly Entity: Type<T>) {}

  abstract findById(id: string): Promise<T | null>;

  abstract create(entity: T): Promise<void>;

  abstract createMany(entities: T[]): Promise<void>;

  abstract save(entity: T): Promise<void>;

  abstract delete(entity: T): Promise<void>;

  toEntity(model: Object | null) {
    return model ? plainToClass(this.Entity, model) : null;
  }
}
