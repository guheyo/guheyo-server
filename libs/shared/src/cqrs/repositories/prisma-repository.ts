import { PRISMA_SERVICE } from '@lib/shared/prisma';
import { ExtendedPrismaService } from '@lib/shared/prisma/extensions/prisma.extension.factory';
import { Inject, Injectable, Type } from '@nestjs/common';
import { BaseRepository } from './base-repository';

@Injectable()
export abstract class PrismaRepository<T> extends BaseRepository<T> {
  @Inject(PRISMA_SERVICE)
  public readonly prismaService: ExtendedPrismaService;

  constructor(protected readonly Entity: Type<T>) {
    super(Entity);
  }
}
