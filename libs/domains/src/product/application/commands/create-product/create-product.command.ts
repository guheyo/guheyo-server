import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateProductInput } from './create-product.input';

export class CreateProductCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  groupId: string;

  categoryId: string;

  brandId?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateProductInput; user: MyUserResponse }) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.groupId = input.groupId;
    this.categoryId = input.categoryId;
    this.brandId = input.brandId;
    this.user = user;
  }
}
