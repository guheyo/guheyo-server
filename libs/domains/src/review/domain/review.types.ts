import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateReviewProps {
  // post
  post: UpdatePostProps;

  id: string;

  content?: string;

  productId?: string;

  rating?: number;

  status?: ReviewStatus;
}

export type ReviewStatus = 'published' | 'draft' | 'flagged' | 'rejected';
