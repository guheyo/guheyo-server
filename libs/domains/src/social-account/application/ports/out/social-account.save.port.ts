import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface SocialAccountSavePort extends SavePort<SocialAccountEntity> {}
