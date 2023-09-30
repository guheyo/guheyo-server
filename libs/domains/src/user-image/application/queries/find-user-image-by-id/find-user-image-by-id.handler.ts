import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@lib/shared';
import { plainToClass } from 'class-transformer';
import { UserImageResponse } from '../../dtos/user-image.response';
import { FindUserImageByIdQuery } from './find-user-image-by-id.query';

@QueryHandler(FindUserImageByIdQuery)
export class FindUserImageByIdHandler implements IQueryHandler<FindUserImageByIdQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindUserImageByIdQuery): Promise<UserImageResponse | null> {
    const userImage = await this.prismaService.userImage.findUnique({
      where: {
        id: query.id,
      },
    });

    return userImage ? plainToClass(UserImageResponse, userImage) : null;
  }
}
