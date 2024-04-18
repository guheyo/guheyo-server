import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { PostLoadPort } from '@lib/domains/post/application/ports/out/post.load.port';
import { PostSavePort } from '@lib/domains/post/application/ports/out/post.save.port';

@Injectable()
export class PostRepository
  extends PrismaRepository<PostEntity>
  implements PostLoadPort, PostSavePort
{
  constructor() {
    super(PostEntity);
  }

  async findById(id: string): Promise<PostEntity | null> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            socialAccounts: true,
            members: {
              include: {
                group: true,
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
          },
        },
        tags: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return this.toEntity(post);
  }

  async create(post: PostEntity): Promise<void> {
    await this.prismaService.post.create({
      data: {
        ..._.pick(post, [
          'id',
          'createdAt',
          'updatedAt',
          'type',
          'title',
          'content',
          'thumbnail',
          'userAgent',
          'ipAddress',
          'groupId',
          'categoryId',
          'userId',
        ]),
      },
    });
  }

  async createMany(posts: PostEntity[]): Promise<void> {
    await this.prismaService.post.createMany({
      data: posts.map((post) =>
        _.pick(post, [
          'id',
          'createdAt',
          'updatedAt',
          'type',
          'title',
          'content',
          'thumbnail',
          'userAgent',
          'ipAddress',
          'groupId',
          'categoryId',
          'userId',
        ]),
      ),
    });
  }

  async save(post: PostEntity): Promise<void> {
    await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: _.pick(post, [
        'archivedAt',
        'pending',
        'type',
        'title',
        'content',
        'thumbnail',
        'categoryId',
        'reportCount',
        'reportCommentCount',
      ]),
    });
  }

  async delete(post: PostEntity): Promise<void> {
    await this.prismaService.post.delete({
      where: {
        id: post.id,
      },
    });
  }

  async connectTags(postId: string, tagIds: string[]): Promise<void> {
    await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        tags: {
          connect: tagIds.map((tagId) => ({
            id: tagId,
          })),
        },
      },
    });
  }
}
