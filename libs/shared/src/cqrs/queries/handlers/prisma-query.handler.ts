import { PRISMA_SERVICE } from '@lib/shared/prisma';
import { ExtendedPrismaService } from '@lib/shared/prisma/extensions/prisma.extension.factory';
import { Inject, Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

@Injectable()
export abstract class PrismaQueryHandler implements IQueryHandler {
  @Inject(PRISMA_SERVICE)
  readonly prismaService: ExtendedPrismaService;

  abstract execute(query: IQuery): Promise<any>;
}
