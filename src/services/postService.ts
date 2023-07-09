import { prisma } from '../loaders';
import _ from 'lodash';

const postService = {
  async getPost(id: string) {
    return prisma.post.findUnique({
      where: {
        id: id
      },
      include: {
        user: {
          include: {
            socialAccounts: true,
            roles: {
              orderBy: {
                rank: 'asc'
              }
            }
          }
        },
        images: true,
        tags: true
      }
    });
  },
  async getRecentPosts({
    categoryId,
    type,
    cursor
  }: {
    categoryId: string,
    type: string,
    cursor: string,
  }) {
    const existCursor = !_.isEmpty(cursor);

    const posts = await prisma.post.findMany({
      take: 18,
      skip: existCursor ? 1 : 0,
      where: {
        categoryId: categoryId,
        type: type
      },
      orderBy: {
        createdAt: 'desc'
      },
      cursor: existCursor ? {
        id: cursor
      }: undefined,
      include: {
        user: {
          include: {
            socialAccounts: true,
            roles: {
              orderBy: {
                rank: 'asc'
              }
            }
          }
        },
        images: true,
        tags: true
      }
    });

    const lastId = posts.at(-1)?.id;
    const hasNextPage = lastId ? (await prisma.post.findMany({
      skip: 1,
      where: {
        categoryId: categoryId,
        type: type
      },
      orderBy: {
        createdAt: 'desc'
      },
      cursor: {
        id: lastId
      },
    })).length > 0: false;

    return {
      posts: posts,
      cursor: lastId,
      hasNextPage: hasNextPage
    }
  },
}

export default postService;