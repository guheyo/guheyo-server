import { Module } from '@nestjs/common';
import { SocialAccountCommandRepository } from '../../adapter/out/persistence/social-account.command.repository';
import { CreateSocialAccountHandler } from './create-social-account/create-social-account.handler';
import { UpdateSocialAccountHandler } from './update-social-account/update-social-account.handler';
import { DeleteSocialAccountHandler } from './delete-social-account/delete-social-account.handler';

const commandHandlers = [
  CreateSocialAccountHandler,
  UpdateSocialAccountHandler,
  DeleteSocialAccountHandler,
];

@Module({
  providers: [
    ...commandHandlers,
    {
      provide: 'SocialAccountSavePort',
      useClass: SocialAccountCommandRepository,
    },
  ],
})
export class SocialAccountCommandModule {}
