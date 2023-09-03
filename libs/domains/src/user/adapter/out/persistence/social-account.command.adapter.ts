import { Injectable } from '@nestjs/common';
import { SocialAccountSavePort } from '@lib/domains/user/application/port/out/social-account.save.port';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { UserCommandRepository } from './user.command.repository';

@Injectable()
export class SocialAccountCommandAdapter implements SocialAccountSavePort {
  constructor(private repository: UserCommandRepository) {}

  async create(socialAccount: SocialAccountEntity): Promise<void> {
    await this.repository.createSocialAccount(socialAccount);
  }

  async update(socialAccount: SocialAccountEntity): Promise<void> {
    await this.repository.updateSocialAccount(socialAccount);
  }

  async delete(userId: string, provider: string, socialId: string): Promise<void> {
    await this.repository.deleteSocialAccount(userId, provider, socialId);
  }
}
