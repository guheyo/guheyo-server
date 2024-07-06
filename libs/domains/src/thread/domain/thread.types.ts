import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateThreadProps {
  // post
  post: UpdatePostProps;

  // offer
  id: string;

  content?: string;
}
