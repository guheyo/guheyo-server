export class OfferBumpEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  offerId: string;

  oldData?: any;

  newData?: any;

  constructor(partial: Partial<OfferBumpEntity>) {
    Object.assign(this, partial);
  }
}
