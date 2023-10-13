import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';

export interface CreateSwapInputWithUploadUserImageInputList {
  createSwapInput: CreateSwapInput;

  uploadUserImageInputList: CreateUserImageInput[];
}
