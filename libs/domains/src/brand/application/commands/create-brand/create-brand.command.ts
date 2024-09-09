import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateBrandInput } from './create-brand.input';

export class CreateBrandCommand implements ICommand {
  id: string;

  name: string;

  slug?: string;

  description?: string;

  logo?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateBrandInput; user: MyUserResponse }) {
    this.id = input.id;
    this.name = input.name;
    this.slug = input.slug;
    this.description = input.description;
    this.logo = input.logo;
    this.user = user;
  }
}
