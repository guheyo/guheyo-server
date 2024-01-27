import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessage } from '../../user/parsers/user.types';
import { SwapParser } from '../parsers/swap.parser';
import { CreateSwapInputWithUploadUserImageInputList } from '../parsers/swap.types';
import { UserImageParser } from '../../user-image/parsers/user-image.parser';

@Injectable()
export class ParseCreateSwapInputWithUploadUserImageInputListPipe implements PipeTransform {
  constructor(
    private readonly swapParser: SwapParser,
    private readonly userImageParser: UserImageParser,
  ) {}

  transform(
    { user, message }: UserWithMessage,
    metadata: ArgumentMetadata,
  ): CreateSwapInputWithUploadUserImageInputList {
    return {
      createSwapInput: this.swapParser.parseCreateDealInput(user.id, message),
      uploadUserImageInputList: this.userImageParser.parseUploadUserImageInputList(
        user.id,
        message,
        'swap',
      ),
    };
  }
}
