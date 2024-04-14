import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateOfferProps {
  // post
  post: UpdatePostProps;

  // offer
  id: string;

  name0?: string;

  name1?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  status?: OfferStatus;
}

export type OfferStatus = 'open' | 'closed';
