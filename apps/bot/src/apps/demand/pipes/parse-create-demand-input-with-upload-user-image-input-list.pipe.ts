import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserWithMessage } from '../../user/parsers/user.types';
import { DemandParser } from '../parsers/demand.parser';
import { CreateDemandInputWithUploadUserImageInputList } from '../parsers/demand.types';
import { UserImageParser } from '../../user-image/parsers/user-image.parser';

@Injectable()
export class ParseCreateDemandInputWithUploadUserImageInputListPipe implements PipeTransform {
  constructor(
    private readonly demandParser: DemandParser,
    private readonly userImageParser: UserImageParser,
  ) {}

  transform(
    { user, message }: UserWithMessage,
    metadata: ArgumentMetadata,
  ): CreateDemandInputWithUploadUserImageInputList {
    return {
      createDemandInput: this.demandParser.parseCreateDealInput(user.id, message),
      uploadUserImageInputList: this.userImageParser.parseUploadUserImageInputList(
        user.id,
        message,
        'demand',
      ),
    };
  }
}
