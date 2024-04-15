import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface PostSavePort extends SavePort<PostEntity> {
  connectTags(postId: string, tagIds: string[]): Promise<void>;
}
