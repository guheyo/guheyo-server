import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { CreateArticleInput } from './create-article.input';

export class CreateArticleCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  content?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateArticleInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.content = input.content;
    this.user = user;
  }
}
