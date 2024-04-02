import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class SellerEntity extends UserEntity {
  countOffersIn24Hours: number;

  maxOffersIn24Hours: 6;

  constructor(partial: Partial<SellerEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  validateCooldown() {
    return this.countOffersIn24Hours < this.maxOffersIn24Hours;
  }
}
