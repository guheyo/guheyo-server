import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { UserWithMessage } from '../../user/parsers/user.types';
import { OfferParser } from '../parsers/offer.parser';

@Injectable()
export class ParseUpdateOfferInputPipe implements PipeTransform {
  constructor(private readonly offerParser: OfferParser) {}

  transform({ user, message }: UserWithMessage, metadata: ArgumentMetadata): UpdateOfferInput {
    return this.offerParser.parseUpdateDealInput(user.id, message);
  }
}
