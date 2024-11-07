import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateProductInput } from './create-product.input';

export class CreateProductCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  brandId?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateProductInput; user: MyUserResponse }) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.brandId = input.brandId;
    this.user = user;
  }
}
