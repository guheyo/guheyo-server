import { PrismaService } from '@lib/shared/prisma';
import { Inject, Injectable, Type } from '@nestjs/common';
import { BaseRepository } from './base-repository';

@Injectable()
export abstract class PrismaRepository<T> extends BaseRepository<T> {
  @Inject()
  protected readonly prismaService: PrismaService;

  constructor(protected readonly Entity: Type<T>) {
    super(Entity);
  }
}
