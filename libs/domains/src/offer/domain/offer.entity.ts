import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omit, omitBy } from 'lodash';
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

export class OfferEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  bumpedAt: Date;

  postId: string;

  @Type(() => PostEntity)
  post: PostEntity;

  businessFunction: string;

  name0: string | null;

  name1: string | null;

  content: string | null;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  totalPrice: number;

  status: OfferStatus;

  bumps: BumpEntity[];

  constructor(partial: Partial<OfferEntity>) {
    super();
    Object.assign(this, partial);
  }

  create(tagIds: string[]) {
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
        postId: this.post.id,
        thumbnail: this.post.thumbnail || undefined,
        tagIds,
      }),
    );
  }

  isAuthorized(userId: string) {
    return this.post.userId === userId;
  }

  update(props: UpdateOfferProps) {
    Object.assign(this, omitBy(omit(props, ['post']), isUndefined));
    this.post.update(props.post);
    this.totalPrice = totalPrice.compute(this);
    this.apply(
      new OfferUpdatedEvent({
        offerId: this.id,
        postId: this.post.id,
      }),
    );
  }

  canBump() {
    return validateCooldown(this.bumpedAt);
  }

  bump(input: BumpOfferInput) {
    this.bumpedAt = new Date();
    this.price = input.newPrice;
    this.apply(
      new BumpedEvent({
        id: input.id,
        offerId: this.id,
        oldPrice: this.price,
        newPrice: input.newPrice,
        username: this.post.user.username,
        avatarURL: this.post.user.avatarURL || undefined,
        businessFunction: this.businessFunction,
        title: this.post.title,
        slug: this.post.slug || undefined,
        price: this.price,
        postId: this.post.id,
        thumbnail: this.post.thumbnail || undefined,
      }),
    );
  }
}
