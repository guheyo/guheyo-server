export interface UpdateOfferProps {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  businessFunction?: string;

  productCategoryId?: string;

  status?: OfferStatus;

  hidden?: boolean;

  brandId?: string;
}

export type OfferStatus = 'open' | 'closed';
