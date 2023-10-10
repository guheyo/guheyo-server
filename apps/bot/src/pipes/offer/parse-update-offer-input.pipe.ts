import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { UserWithMessage } from '../../apps/user/user.types';
import { OfferParser } from '../../apps/offer/offer.parser';

@Injectable()
export class ParseUpdateOfferInputPipe implements PipeTransform {
  constructor(private readonly offerParser: OfferParser) {}

  transform({ user, message }: UserWithMessage, metadata: ArgumentMetadata): UpdateOfferInput {
    return this.offerParser.parseUpdateDealInput(user.id, message);
  }
}
