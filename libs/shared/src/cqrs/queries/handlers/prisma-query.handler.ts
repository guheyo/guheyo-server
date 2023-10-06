import { PrismaService } from '@lib/shared/prisma';
import { Inject, Injectable, Type } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';
import { BaseQueryHandler } from './base-query.handler';

@Injectable()
export abstract class PrismaQueryHandler<T extends IQuery, TRes> extends BaseQueryHandler<T, TRes> {
  @Inject()
  readonly prismaService: PrismaService;

  constructor(protected readonly Response: Type<TRes>) {
    super(Response);
  }
}
