import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';

export interface CreateDemandInputWithUploadUserImageInputList {
  createDemandInput: CreateDemandInput;

  uploadUserImageInputList: CreateUserImageInput[];
}
