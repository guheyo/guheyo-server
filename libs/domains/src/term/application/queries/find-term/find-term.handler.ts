import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { TermErrorMessage } from '../../domain/term.error.message';
import { FindTermQuery } from './find-term.query';
import { TermResponse } from '../../dtos/term.response';

@QueryHandler(FindTermQuery)
export class FindTermHandler extends PrismaQueryHandler<FindTermQuery, TermResponse> {
  constructor() {
    super(TermResponse);
  }

  async execute(query: FindTermQuery): Promise<any> {
    const term = await this.prismaService.term.findFirst({
      where: {
        name: query.name,
      },
    });
    if (!term) throw new NotFoundException(TermErrorMessage.TERM_IS_NOT_FOUND);

    return this.parseResponse(term);
  }
}
