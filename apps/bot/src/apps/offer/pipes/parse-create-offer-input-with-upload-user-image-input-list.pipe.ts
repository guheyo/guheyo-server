import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessage } from '../../user/parsers/user.types';
import { OfferParser } from '../parsers/offer.parser';
import { CreateOfferInputWithUploadUserImageInputList } from '../parsers/offer.types';

@Injectable()
export class ParseCreateOfferInputWithUploadUserImageInputListPipe implements PipeTransform {
  constructor(private readonly offerParser: OfferParser) {}

  async transform(
    { user, message }: UserWithMessage,
    metadata: ArgumentMetadata,
  ): Promise<CreateOfferInputWithUploadUserImageInputList> {
    const fetchedMessage = await message.fetch();
    return {
      createOfferInput: this.offerParser.parseCreateDealInput(user.id, fetchedMessage),
      uploadUserImageInputList: this.offerParser.parseUploadUserImageInputList(
        user.id,
        fetchedMessage,
        'offer',
      ),
    };
  }
}
