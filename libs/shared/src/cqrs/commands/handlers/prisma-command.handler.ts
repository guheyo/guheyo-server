import { PRISMA_SERVICE } from '@lib/shared/prisma';
import { ExtendedPrismaService } from '@lib/shared/prisma/extensions/prisma.extension.factory';
import { Inject, Injectable, Type } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import { BaseCommandHandler } from './base-command.handler';

@Injectable()
export abstract class PrismaCommandHandler<T extends ICommand, TRes> extends BaseCommandHandler<
  T,
  TRes
> {
  @Inject(PRISMA_SERVICE)
  readonly prismaService: ExtendedPrismaService;

  constructor(protected readonly Response: Type<TRes>) {
    super(Response);
  }
}
