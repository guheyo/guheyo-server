import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { UserWithMessage } from '../../user/parsers/user.types';
import { DemandParser } from '../parsers/demand.parser';

@Injectable()
export class ParseUpdateDemandInputPipe implements PipeTransform {
  constructor(private readonly demandParser: DemandParser) {}

  transform({ user, message }: UserWithMessage, metadata: ArgumentMetadata): UpdateDemandInput {
    return this.demandParser.parseUpdateDealInput(user.id, message);
  }
}
