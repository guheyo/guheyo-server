import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessage } from '../../apps/user/user.types';
import { OfferParser } from '../../apps/offer/offer.parser';
import { CreateOfferInputWithUploadUserImageInputList } from '../../apps/offer/offer.types';

@Injectable()
export class ParseCreateOfferInputWithUploadUserImageInputListPipe implements PipeTransform {
  constructor(private readonly offerParser: OfferParser) {}

  transform(
    { user, message }: UserWithMessage,
    metadata: ArgumentMetadata,
  ): CreateOfferInputWithUploadUserImageInputList {
    return {
      createOfferInput: this.offerParser.parseCreateDealInput(user.id, message),
      uploadUserImageInputList: this.offerParser.parseUploadUserImageInputList(
        user.id,
        message,
        'offer',
      ),
    };
  }
}
