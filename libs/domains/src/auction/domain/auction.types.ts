import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateAuctionProps {
  // post
  post?: UpdatePostProps;

  // auction
  id: string;

  extendedEndDate?: Date;
}
