import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { BumpedEvent } from '@lib/domains/bump/application/events/bumped/bumped.event';
import { totalPrice } from '@lib/shared/prisma/extensions/calculate-total-price.extension';
import { validateCooldown } from '@lib/shared/cooldown/validate-cooldown';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { OfferStatus, UpdateOfferProps } from './offer.types';
import { OfferCreatedEvent } from '../application/events/offer-created/offer-created.event';
import { OfferUpdatedEvent } from '../application/events/offer-updated/offer-updated.event';
import { BumpOfferInput } from '../application/commands/bump-offer/bump-offer.input';
import { CreateOfferCommand } from '../application/commands/create-offer/create-offer.command';

export class OfferEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  bumpedAt: Date;

  postId: string;

  @Type()
  post: PostEntity;

  businessFunction: string;

  type: string;

  name0: string | null;

  name1: string | null;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  totalPrice: number;

  status: OfferStatus;

  bumps: BumpEntity[];

  constructor(command: CreateOfferCommand) {
    super();
    const partialPost = new PostEntity({
      ...command.post,
      userId: command.user.id,
    });
    Object.assign(this, {
      ...command,
      post: partialPost,
    });
  }

  create() {
    this.apply(
      new OfferCreatedEvent({
        id: this.id,
        username: this.post.user.username,
        avatarURL: this.post.user.avatarURL || undefined,
        businessFunction: this.businessFunction,
        title: this.post.title,
        slug: this.post.slug || undefined,
        price: this.price,
        userAgent: this.post.userAgent || undefined,
      }),
    );
  }

  isAuthorized(userId: string) {
    return this.post.userId === userId;
  }

  update(props: UpdateOfferProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.totalPrice = totalPrice.compute(this);
    this.apply(
      new OfferUpdatedEvent({
        id: this.id,
        businessFunction: this.businessFunction,
      }),
    );
  }

  canBump() {
    return validateCooldown(this.bumpedAt);
  }

  bump(input: BumpOfferInput) {
    this.apply(
      new BumpedEvent({
        id: input.id,
        offerId: this.id,
        oldPrice: this.price,
        newPrice: input.newPrice,
      }),
    );
    this.bumpedAt = new Date();
    this.price = input.newPrice;
  }
}
