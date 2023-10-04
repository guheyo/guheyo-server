import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserWithMessageType } from '../../user/user.types';
import { OfferParser } from './offer.parser';
import { OfferErrorMessage } from './offer.error-message';
import { OfferWithUserImagesCreateInput } from './offer.types';

@Injectable()
export class OfferPipe implements PipeTransform {
  constructor(private readonly offerParser: OfferParser) {}

  transform(
    { user, message }: UserWithMessageType,
    metadata: ArgumentMetadata,
  ): OfferWithUserImagesCreateInput {
    this.offerParser.set(user.id, message);
    if (!this.offerParser.validate())
      throw new RpcException(OfferErrorMessage.INVALID_OFFER_FORMAT);

    return this.offerParser.parse();
  }
}
