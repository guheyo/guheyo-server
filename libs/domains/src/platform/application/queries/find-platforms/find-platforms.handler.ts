import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindPlatformsQuery } from './find-platforms.query';
import { PlatformResponse } from '../../dtos/platform.response';

@QueryHandler(FindPlatformsQuery)
export class FindPlatformssHandler extends PrismaQueryHandler {
  async execute(query: FindPlatformsQuery): Promise<PlatformResponse[]> {
    const platforms = await this.prismaService.platform.findMany({
      orderBy: {
        position: 'asc',
      },
    });
    return platforms.map((platform) => plainToInstance(PlatformResponse, platform));
  }
}
