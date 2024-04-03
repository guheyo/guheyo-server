import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindSessionQuery } from './find-session.query';
import { SessionResponse } from '../../dtos/session.response';

@QueryHandler(FindSessionQuery)
export class FindSessionHandler extends PrismaQueryHandler<FindSessionQuery, SessionResponse> {
  constructor() {
    super(SessionResponse);
  }

  async execute(query: FindSessionQuery): Promise<SessionResponse | null> {
    const session = await this.prismaService.session.findUnique({
      where: {
        sessionToken: query.sessionToken,
      },
      select: {
        sessionToken: true,
        expires: true,
        userId: true,
      },
    });
    return this.parseResponse(session);
  }
}
