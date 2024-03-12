import { PRISMA_SERVICE } from '@lib/shared/prisma';
import { ExtendedPrismaService } from '@lib/shared/prisma/extensions/prisma.extension.factory';
import { Inject, Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
export abstract class PrismaCommandHandler<T extends ICommand> implements ICommandHandler<T> {
  @Inject(PRISMA_SERVICE)
  readonly prismaService: ExtendedPrismaService;

  abstract execute(command: T): Promise<void>;
}
