import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateMembersOfUserInput } from '@lib/domains/member/application/commands/create-members-of-user/create-members-of-user.input';
import _ from 'lodash';
import { UpdateUserProps } from './user.types';
import { UserCreatedEvent } from '../application/events/user-created/user-created.event';
import { SocialAccountLinkedEvent } from '../application/events/social-account-linked/social-account-linked.event';
import { UserUpdatedEvent } from '../application/events/user-updated/user-updated.event';

export class UserEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  username: string;

  name: string | null;

  phoneNumber: string | null;

  avatarURL: string | null;

  bot: boolean;

  socialAccounts: SocialAccountEntity[];

  members: MemberEntity[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  create(createMembersOfUserInput: CreateMembersOfUserInput) {
    this.apply(new UserCreatedEvent(createMembersOfUserInput));
  }

  createUserFromDiscord(
    createMembersOfUserInput: CreateMembersOfUserInput,
    socialAccountId: string,
    provider: string,
    socialId: string,
  ) {
    this.create(createMembersOfUserInput);
    this.linkSocialAccount(socialAccountId, provider, socialId);
  }

  update(props: UpdateUserProps) {
    Object.assign(this, _.pickBy(props, _.identity));
    this.apply(new UserUpdatedEvent(this.id));
  }

  private linkSocialAccount(socialAccountId: string, provider: string, socialId: string) {
    this.apply(
      new SocialAccountLinkedEvent({
        socialAccountId,
        provider,
        socialId,
        userId: this.id,
      }),
    );
  }
}
