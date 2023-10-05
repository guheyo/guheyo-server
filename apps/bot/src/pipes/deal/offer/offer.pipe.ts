import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessageType } from '../../user/user.types';
import { OfferParser } from './offer.parser';
import { OfferWithUserImagesCreateInput } from './offer.types';

@Injectable()
export class OfferPipe implements PipeTransform {
  constructor(private readonly offerParser: OfferParser) {}

  transform(
    { user, message }: UserWithMessageType,
    metadata: ArgumentMetadata,
  ): OfferWithUserImagesCreateInput {
    return this.offerParser.parse(user.id, message);
  }
}
