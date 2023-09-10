import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountDeleteCommand } from '@lib/domains/social-account/application/commands/social-account-delete/social-account.delete.command';

@Injectable()
export class SocialAccountCommandRepository implements SavePort<SocialAccountEntity> {
  constructor(private prismaService: PrismaService) {}

  async create(socialAccount: SocialAccountEntity): Promise<void> {
    await this.prismaService.socialAccount.create({
      data: socialAccount,
    });
  }

  async update(socialAccount: SocialAccountEntity): Promise<void> {
    await this.prismaService.socialAccount.updateMany({
      where: {
        id: socialAccount.id,
        userId: socialAccount.userId,
      },
      data: socialAccount,
    });
  }

  async delete(socialAccount: SocialAccountDeleteCommand): Promise<void> {
    await this.prismaService.socialAccount.delete({
      where: {
        id: socialAccount.id,
      },
    });
  }
}
