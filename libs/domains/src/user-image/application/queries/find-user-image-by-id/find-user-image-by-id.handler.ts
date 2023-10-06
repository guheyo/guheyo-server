import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { UserImageResponse } from '../../dtos/user-image.response';
import { FindUserImageByIdQuery } from './find-user-image-by-id.query';

@QueryHandler(FindUserImageByIdQuery)
export class FindUserImageByIdHandler extends PrismaQueryHandler<
  FindUserImageByIdQuery,
  UserImageResponse
> {
  constructor() {
    super(UserImageResponse);
  }

  async execute(query: FindUserImageByIdQuery): Promise<UserImageResponse | null> {
    const userImage = await this.prismaService.userImage.findUnique({
      where: {
        id: query.id,
      },
    });
    return this.parseResponse(userImage);
  }
}
