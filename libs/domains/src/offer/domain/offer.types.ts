export interface UpdateOfferProps {
  id: string;

  name0?: string;

  name1?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  categoryId?: string;

  status?: OfferStatus;
}

export type OfferStatus = 'open' | 'closed';
