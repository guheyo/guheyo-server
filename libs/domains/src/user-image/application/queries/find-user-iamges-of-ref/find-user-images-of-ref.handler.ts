import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindUserImagesOfRefQuery } from './find-user-images-of-ref.query';
import { UserImageResponse } from '../../dtos/user-image.response';

@QueryHandler(FindUserImagesOfRefQuery)
export class FindUserImagesOfRefHandler extends PrismaQueryHandler<
  FindUserImagesOfRefQuery,
  UserImageResponse
> {
  constructor() {
    super(UserImageResponse);
  }

  async execute(query: FindUserImagesOfRefQuery): Promise<UserImageResponse[]> {
    const userImages = await this.prismaService.userImage.findMany({
      where: {
        type: query.type,
        refId: query.refId,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponses(userImages);
  }
}
