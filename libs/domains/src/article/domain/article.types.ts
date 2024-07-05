import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateArticleProps {
  // post
  post: UpdatePostProps;

  // offer
  id: string;

  content?: string;
}
