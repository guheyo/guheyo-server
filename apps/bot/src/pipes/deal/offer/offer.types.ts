import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';

export interface OfferWithUserImagesCreateInput {
  createOfferInput: CreateOfferInput;

  createUserImagesInput: CreateUserImageInput[];
}
