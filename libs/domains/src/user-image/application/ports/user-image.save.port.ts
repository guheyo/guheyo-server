import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { UserImageEntity } from '../../domain/user-image.entity';

export interface UserImageSavePort extends SavePort<UserImageEntity> {
  trackImages(type: string, refId: string): Promise<void>;
  untrackImages(type: string, refId: string): Promise<void>;
}
