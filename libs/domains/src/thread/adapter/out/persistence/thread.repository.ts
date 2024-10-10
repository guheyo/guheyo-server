import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ThreadLoadPort } from '@lib/domains/thread/application/ports/out/thread.load.port';
import { ThreadSavePort } from '@lib/domains/thread/application/ports/out/thread.save.port';
import { ThreadEntity } from '@lib/domains/thread/domain/thread.entity';

@Injectable()
export class ThreadRepository
  extends PrismaRepository<ThreadEntity>
  implements ThreadLoadPort, ThreadSavePort
{
  constructor() {
    super(ThreadEntity);
  }

  async findById(id: string): Promise<ThreadEntity | null> {
    const thread = await this.prismaService.thread.findUnique({
      where: {
        id,
      },
      include: {
        post: {
          include: {
            user: {
              include: {
                socialAccounts: true,
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
            tags: {
              orderBy: {
                position: 'asc',
              },
            },
            brands: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });
    return this.toEntity(thread);
  }

  async create(thread: ThreadEntity): Promise<void> {
    const post = await this.prismaService.post.create({
      data: {
        ..._.pick(thread.post, [
          'id',
          'createdAt',
          'updatedAt',
          'type',
          'title',
          'userAgent',
          'ipAddress',
          'groupId',
          'categoryId',
          'userId',
        ]),
        brands: {
          connect: thread.post.brands.map((brand) => ({
            id: brand.id,
          })),
        },
      },
    });
    await this.prismaService.thread.create({
      data: {
        ..._.pick(thread, ['id', 'content']),
        postId: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  }

  async createMany(threads: ThreadEntity[]): Promise<void> {
    await Promise.all(threads.map((thread) => this.create(thread)));
  }

  async save(thread: ThreadEntity): Promise<void> {
    await this.prismaService.thread.update({
      where: {
        id: thread.id,
      },
      data: {
        post: {
          update: {
            ..._.pick(thread.post, ['pending', 'title', 'categoryId']),
          },
        },
        ..._.pick(thread, ['content']),
      },
    });
  }

  async delete(thread: ThreadEntity): Promise<void> {
    await this.prismaService.thread.delete({
      where: {
        id: thread.id,
      },
    });
  }
}
