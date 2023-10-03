import { UserImageEntity } from '@lib/domains/user-image/domain/user-image.entity';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class UserImageRepository extends PrismaRepository<UserImageEntity> {
  constructor() {
    super(UserImageEntity);
  }

  async findById(id: string): Promise<UserImageEntity | null> {
    const userImage = await this.prismaService.userImage.findUnique({
      where: {
        id,
      },
    });

    return this.toEntity(userImage);
  }

  async create(userImage: UserImageEntity): Promise<void> {
    await this.prismaService.userImage.create({
      data: _.pick(userImage, [
        'id',
        'name',
        'url',
        'contentType',
        'description',
        'height',
        'width',
        'position',
        'type',
        'refId',
        'tracked',
        'userId',
      ]),
    });
  }

  async save(userImage: UserImageEntity): Promise<void> {
    await this.prismaService.userImage.update({
      where: {
        id: userImage.id,
      },
      data: _.pick(userImage, ['position', 'tracked']),
    });
  }

  async delete(userImage: UserImageEntity): Promise<void> {
    await this.prismaService.userImage.delete({
      where: {
        id: userImage.id,
      },
    });
  }
}
