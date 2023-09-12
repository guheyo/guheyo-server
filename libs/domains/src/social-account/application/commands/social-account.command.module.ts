import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SocialAccountCommandRepository } from '../../adapter/out/persistence/social-account.command.repository';
import { CreateSocialAccountHandler } from './create-social-account/create-social-account.handler';
import { SocialAccountUpdateHandler } from './social-account-update/social-account.update.handler';
import { SocialAccountDeleteHandler } from './social-account-delete/social-account.delete.handler';

const commandHandlers = [
  CreateSocialAccountHandler,
  SocialAccountUpdateHandler,
  SocialAccountDeleteHandler,
];

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    ...commandHandlers,
    {
      provide: 'SocialAccountSavePort',
      useClass: SocialAccountCommandRepository,
    },
  ],
  exports: [
    ...commandHandlers,
    {
      provide: 'SocialAccountSavePort',
      useClass: SocialAccountCommandRepository,
    },
  ],
})
export class SocialAccountCommandModule {}
