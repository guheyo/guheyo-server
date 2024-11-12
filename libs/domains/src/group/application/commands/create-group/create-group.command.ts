import { ICommand } from '@nestjs/cqrs/dist';
import { CreateGroupInput } from './create-group.input';
import { CreateCategoryInput } from '../create-category/create-category.input';

export class CreateGroupCommand implements ICommand {
  categories: CreateCategoryInput[];

  id: string;

  name: string;

  slug: string;

  description?: string;

  icon?: string;

  position?: number;

  constructor(input: CreateGroupInput) {
    this.categories = input.categories;
    this.id = input.id;
    this.name = input.name;
    this.slug = input.slug;
    this.description = input.description;
    this.icon = input.icon;
    this.position = input.position;
  }
}
