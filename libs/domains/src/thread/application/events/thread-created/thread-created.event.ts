import { IEvent } from '@nestjs/cqrs';
import { ThreadCreatedInput } from './thread-created.input';

export class ThreadCreatedEvent implements IEvent {
  threadId: string;

  postId: string;

  tagNames: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  constructor(input: ThreadCreatedInput) {
    this.threadId = input.threadId;
    this.postId = input.postId;
    this.tagNames = input.tagNames;
    this.username = input.username;
    this.userAvatarURL = input.userAvatarURL;
    this.title = input.title;
    this.slug = input.slug;
  }
}
