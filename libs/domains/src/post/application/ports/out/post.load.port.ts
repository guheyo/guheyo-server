import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface PostLoadPort extends LoadPort<PostEntity> {}
