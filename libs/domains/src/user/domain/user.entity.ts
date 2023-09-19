import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { JoinedUserCreatedInput } from '../application/events/joined-user-created/joined-user-created.input';
import { JoinedUserCreatedEvent } from '../application/events/joined-user-created/joined-user-created.event';

export class UserEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  name: string | null;

  username: string;

  avatarURL: string | null;

  bot: boolean;

  socialAccounts: SocialAccountEntity[];

  members: MemberEntity[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  createdJoinedUser(input: JoinedUserCreatedInput) {
    this.apply(new JoinedUserCreatedEvent(input));
    this.commit();
  }
}
