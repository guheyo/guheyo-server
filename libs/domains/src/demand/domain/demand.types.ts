export interface UpdateDemandProps {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  businessFunction?: string;

  productCategoryId?: string;

  status?: DemandStatus;

  isHidden?: boolean;

  brandId?: string;
}

export type DemandStatus = 'open' | 'closed';
