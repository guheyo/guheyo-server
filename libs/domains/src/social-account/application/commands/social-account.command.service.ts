import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SocialAccountCreateInput } from './social-account-create/social-account.create.input';
import { SocialAccountCreateCommand } from './social-account-create/social-account.create.command';
import { SocialAccountUpdateInput } from './social-account-update/social-account.update.input';
import { SocialAccountUpdateCommand } from './social-account-update/social-account.update.command';
import { SocialAccountDeleteInput } from './social-account-delete/social-account.delete.input';
import { SocialAccountDeleteCommand } from './social-account-delete/social-account.delete.command';

@Injectable()
export class SocialAccountCommandService {
  constructor(private commandBus: CommandBus) {}

  async create(input: SocialAccountCreateInput): Promise<void> {
    return this.commandBus.execute(new SocialAccountCreateCommand(input));
  }

  async update(input: SocialAccountUpdateInput): Promise<void> {
    return this.commandBus.execute(new SocialAccountUpdateCommand(input));
  }

  async delete(input: SocialAccountDeleteInput): Promise<void> {
    return this.commandBus.execute(new SocialAccountDeleteCommand(input));
  }
}
