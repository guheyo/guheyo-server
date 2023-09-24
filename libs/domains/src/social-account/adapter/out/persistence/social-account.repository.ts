import { Injectable } from '@nestjs/common';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { DeleteSocialAccountCommand } from '@lib/domains/social-account/application/commands/delete-social-account/delete-social-account.command';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';

@Injectable()
export class SocialAccountRepository extends PrismaRepository<SocialAccountEntity> {
  constructor() {
    super(SocialAccountEntity);
  }

  async findById(id: string): Promise<SocialAccountEntity | null> {
    const socialAccount = await this.prismaService.socialAccount.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(socialAccount);
  }

  async create(socialAccount: SocialAccountEntity): Promise<void> {
    await this.prismaService.socialAccount.create({
      data: socialAccount,
    });
  }

  async save(socialAccount: SocialAccountEntity): Promise<void> {
    await this.prismaService.socialAccount.updateMany({
      where: {
        id: socialAccount.id,
        userId: socialAccount.userId,
      },
      data: socialAccount,
    });
  }

  async delete(socialAccount: DeleteSocialAccountCommand): Promise<void> {
    await this.prismaService.socialAccount.delete({
      where: {
        id: socialAccount.id,
      },
    });
  }
}