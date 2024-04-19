import { UpdatePostProps } from '@lib/domains/post/domain/post.types';

export interface UpdateOfferProps {
  // post
  post: UpdatePostProps;

  // offer
  id: string;

  name0?: string;

  name1?: string;

  content?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  status?: OfferStatus;
}

export type OfferStatus = 'open' | 'closed';

export const OFFER_BUSINESS_FUNCTIONS = ['sell', 'buy', 'swap'] as const;

export type OfferBusinessFunction = (typeof OFFER_BUSINESS_FUNCTIONS)[number];
