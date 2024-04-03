import { PRISMA_SERVICE } from '@lib/shared/prisma';
import { ExtendedPrismaService } from '@lib/shared/prisma/extensions/prisma.extension.factory';
import { Inject, Injectable, Type } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';
import { BaseQueryHandler } from './base-query.handler';

@Injectable()
export abstract class PrismaQueryHandler<T extends IQuery, TRes> extends BaseQueryHandler<T, TRes> {
  @Inject(PRISMA_SERVICE)
  readonly prismaService: ExtendedPrismaService;

  constructor(protected readonly Response: Type<TRes>) {
    super(Response);
  }
}
