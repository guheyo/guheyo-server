import { LoadPort } from '@lib/shared/cqrs/ports/load.port';
import { UserImageEntity } from '../../domain/user-image.entity';

export interface UserImageLoadPort extends LoadPort<UserImageEntity> {}
