import { ICommand } from '@nestjs/cqrs';
import { CreateUserImageInput } from '../create-user-image/create-user-image.input';
import { CreateManyUserImageInput } from './create-many-user-image.input';

export class CreateManyUserImageCommand implements ICommand {
  createUserImageInputs: CreateUserImageInput[];

  userId: string;

  constructor({ input, userId }: { input: CreateManyUserImageInput; userId: string }) {
    this.createUserImageInputs = input.createUserImageInputs;
    this.userId = userId;
  }
}
