export interface UpdateSwapProps {
  id: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  name0?: string;

  name1?: string;

  description0?: string;

  description1?: string;

  businessFunction?: string;

  productCategoryId?: string;

  status?: SwapStatus;

  hidden?: boolean;

  brandId?: string;
}

export type SwapStatus = 'open' | 'closed';
