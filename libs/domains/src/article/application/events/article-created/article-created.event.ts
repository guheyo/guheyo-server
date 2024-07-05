import { IEvent } from '@nestjs/cqrs';
import { ArticleCreatedInput } from './article-created.input';

export class ArticleCreatedEvent implements IEvent {
  articleId: string;

  postId: string;

  tagNames: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  constructor(input: ArticleCreatedInput) {
    this.articleId = input.articleId;
    this.postId = input.postId;
    this.tagNames = input.tagNames;
    this.username = input.username;
    this.userAvatarURL = input.userAvatarURL;
    this.title = input.title;
    this.slug = input.slug;
  }
}
