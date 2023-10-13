import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { UserWithMessage } from '../../user/parsers/user.types';
import { SwapParser } from '../parsers/swap.parser';

@Injectable()
export class ParseUpdateSwapInputPipe implements PipeTransform {
  constructor(private readonly swapParser: SwapParser) {}

  transform({ user, message }: UserWithMessage, metadata: ArgumentMetadata): UpdateSwapInput {
    return this.swapParser.parseUpdateDealInput(user.id, message);
  }
}
