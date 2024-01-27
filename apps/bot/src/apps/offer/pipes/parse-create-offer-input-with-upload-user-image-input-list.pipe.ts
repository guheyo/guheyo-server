import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessage } from '../../user/parsers/user.types';
import { OfferParser } from '../parsers/offer.parser';
import { CreateOfferInputWithUploadUserImageInputList } from '../parsers/offer.types';
import { UserImageParser } from '../../user-image/parsers/user-image.parser';

@Injectable()
export class ParseCreateOfferInputWithUploadUserImageInputListPipe implements PipeTransform {
  constructor(
    private readonly offerParser: OfferParser,
    private readonly userImageParser: UserImageParser,
  ) {}

  transform(
    { user, message }: UserWithMessage,
    metadata: ArgumentMetadata,
  ): CreateOfferInputWithUploadUserImageInputList {
    return {
      createOfferInput: this.offerParser.parseCreateDealInput(user.id, message),
      uploadUserImageInputList: this.userImageParser.parseUploadUserImageInputList(
        user.id,
        message,
        'offer',
      ),
    };
  }
}
