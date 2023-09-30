import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import _ from 'lodash';
import { JoinedUserCreatedInput } from '../application/events/joined-user-created/joined-user-created.input';
import { JoinedUserCreatedEvent } from '../application/events/joined-user-created/joined-user-created.event';
import { UpdateUserProps } from './user.types';

export class UserEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

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

  update(props: UpdateUserProps) {
    Object.assign(this, _.pickBy(props, _.identity));
  }
}
