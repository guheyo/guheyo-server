import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateUserReviewProps {
  // post
  post: UpdatePostProps;

  // offer
  id: string;

  content?: string;

  rating?: number;
}

export type UserReviewStatus = 'oneWay' | 'twoWay';
