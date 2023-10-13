import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessage } from '../../user/parsers/user.types';
import { SwapParser } from '../parsers/swap.parser';
import { CreateSwapInputWithUploadUserImageInputList } from '../parsers/swap.types';

@Injectable()
export class ParseCreateSwapInputWithUploadUserImageInputListPipe implements PipeTransform {
  constructor(private readonly swapParser: SwapParser) {}

  transform(
    { user, message }: UserWithMessage,
    metadata: ArgumentMetadata,
  ): CreateSwapInputWithUploadUserImageInputList {
    return {
      createSwapInput: this.swapParser.parseCreateDealInput(user.id, message),
      uploadUserImageInputList: this.swapParser.parseUploadUserImageInputList(
        user.id,
        message,
        'swap',
      ),
    };
  }
}
