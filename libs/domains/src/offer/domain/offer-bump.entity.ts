export class OfferBumpEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  offerId: string;

  oldPrice: number;

  newPrice: number;

  constructor(partial: Partial<OfferBumpEntity>) {
    Object.assign(this, partial);
  }
}
