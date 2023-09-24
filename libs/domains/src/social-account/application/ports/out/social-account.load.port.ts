import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface SocialAccountLoadPort extends LoadPort<SocialAccountEntity> {}
