import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ArticleLoadPort } from '@lib/domains/article/application/ports/out/article.load.port';
import { ArticleSavePort } from '@lib/domains/article/application/ports/out/article.save.port';
import { ArticleEntity } from '@lib/domains/article/domain/article.entity';

@Injectable()
export class ArticleRepository
  extends PrismaRepository<ArticleEntity>
  implements ArticleLoadPort, ArticleSavePort
{
  constructor() {
    super(ArticleEntity);
  }

  async findById(id: string): Promise<ArticleEntity | null> {
    const article = await this.prismaService.article.findUnique({
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
          },
        },
      },
    });
    return this.toEntity(article);
  }

  async create(article: ArticleEntity): Promise<void> {
    const post = await this.prismaService.post.create({
      data: {
        ..._.pick(article.post, [
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
      },
    });
    await this.prismaService.article.create({
      data: {
        ..._.pick(article, ['id', 'content']),
        postId: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  }

  async createMany(articles: ArticleEntity[]): Promise<void> {
    await Promise.all(articles.map((article) => this.create(article)));
  }

  async save(article: ArticleEntity): Promise<void> {
    await this.prismaService.article.update({
      where: {
        id: article.id,
      },
      data: {
        post: {
          update: {
            ..._.pick(article.post, ['pending', 'title', 'categoryId']),
          },
        },
        ..._.pick(article, ['content']),
      },
    });
  }

  async delete(article: ArticleEntity): Promise<void> {
    await this.prismaService.article.delete({
      where: {
        id: article.id,
      },
    });
  }
}
