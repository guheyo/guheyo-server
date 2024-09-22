import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { isUndefined, omit, omitBy } from 'lodash';
import { ThreadCreatedEvent } from '../application/events/thread-created/thread-created.event';
import { UpdateThreadProps } from './thread.types';
import { ThreadUpdatedEvent } from '../application/events/thread-updated/thread-updated.event';

export class ThreadEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  postId: string;

  @Type()
  post: PostEntity;

  content: string | null;

  constructor(partial: Partial<ThreadEntity>) {
    super();
    Object.assign(this, partial);
  }

  create({ tagNames }: { tagNames: string[] }) {
    this.apply(
      new ThreadCreatedEvent({
        threadId: this.id,
        postId: this.postId,
        tagNames,
        username: this.post.user.username,
        userAvatarURL: this.post.user.avatarURL || undefined,
        title: this.post.title,
        slug: this.post.slug || undefined,
      }),
    );
  }

  update(props: UpdateThreadProps) {
    Object.assign(this, omitBy(omit(props, ['post']), isUndefined));
    this.post.update(props.post);
    this.apply(
      new ThreadUpdatedEvent({
        threadId: this.id,
        postId: this.post.id,
      }),
    );
  }

  isAuthorized(userId: string) {
    return this.post.userId === userId;
  }
}
