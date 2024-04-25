import { PrismaClient } from '@prisma/client';

const USER_REVIEW_CATEGORY_TYPE = 'userReview';

const CATEGORY_HOST_REVIEW_NAME = '호스트 리뷰';
const CATEGORY_HOST_REVIEW_SLUG = 'host-review';
const CATEGORY_GUEST_REVIEW_NAME = '게스트 리뷰';
const CATEGORY_GUEST_REVIEW_SLUG = 'guest-review';

export async function seedUserReviewCategories(prisma: PrismaClient) {
  const categories = await prisma.category.findMany({
    where: {
      type: USER_REVIEW_CATEGORY_TYPE,
    },
  });
  if (!categories.length) {
    await prisma.category.createMany({
      data: [
        {
          type: USER_REVIEW_CATEGORY_TYPE,
          name: CATEGORY_HOST_REVIEW_NAME,
          slug: CATEGORY_HOST_REVIEW_SLUG,
          position: 0,
        },
        {
          type: USER_REVIEW_CATEGORY_TYPE,
          name: CATEGORY_GUEST_REVIEW_NAME,
          slug: CATEGORY_GUEST_REVIEW_SLUG,
          position: 1,
        },
      ],
    });
  }
  console.log(categories);
}
