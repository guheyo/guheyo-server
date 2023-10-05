import { ICommand } from '@nestjs/cqrs';
import { CreateUserImageInput } from '../create-user-image/create-user-image.input';
import { CreateManyUserImageInput } from './create-many-user-image.input';

export class CreateManyUserImageCommand implements ICommand {
  data: CreateUserImageInput[];

  constructor(input: CreateManyUserImageInput) {
    this.data = input.data;
  }
}
