import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindPlatformsQuery } from './find-platforms.query';
import { PlatformResponse } from '../../dtos/platform.response';

@QueryHandler(FindPlatformsQuery)
export class FindPlatformssHandler extends PrismaQueryHandler {
  async execute(query: FindPlatformsQuery): Promise<PlatformResponse[]> {
    const brands = await this.prismaService.brand.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return brands.map((brand) => plainToClass(PlatformResponse, brand));
  }
}
