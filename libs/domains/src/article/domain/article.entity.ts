import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { ArticleCreatedEvent } from '../application/events/article-created/article-created.event';

export class ArticleEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  postId: string;

  @Type()
  post: PostEntity;

  content: string | null;

  constructor(partial: Partial<ArticleEntity>) {
    super();
    Object.assign(this, partial);
  }

  create(tagIds: string[]) {
    this.apply(
      new ArticleCreatedEvent({
        articleId: this.id,
        postId: this.postId,
        tagIds,
        username: this.post.user.username,
        userAvatarURL: this.post.user.avatarURL || undefined,
        title: this.post.title,
        slug: this.post.slug || undefined,
      }),
    );
  }

  isAuthorized(userId: string) {
    return this.post.userId === userId;
  }
}
