import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindEmojisQuery } from './find-emojis.query';
import { EmojiResponse } from '../../dtos/emoji.response';

@QueryHandler(FindEmojisQuery)
export class FindEmojisHandler extends PrismaQueryHandler {
  async execute(query: FindEmojisQuery): Promise<EmojiResponse[]> {
    const emojis = await this.prismaService.emoji.findMany({
      where: {
        groupId: query.groupId,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return plainToClass(EmojiResponse, emojis);
  }
}
