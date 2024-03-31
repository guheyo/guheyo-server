import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, filter, map, of } from 'rxjs';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { CreateUserImageCommand } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.command';
import { pick } from 'lodash';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';
import { SocialAccountLinkedEvent } from '../events/social-account-linked/social-account-linked.event';
import { UserUpdatedEvent } from '../events/user-updated/user-updated.event';
import { AvatarCreatedEvent } from '../events/avatar-created/avatar-created.event';
import { UserCheckedReceivedReportsEvent } from '../events/user-checked-received-reports/user-checked-received-reports.event';

@Injectable()
export class UserSagas {
  @Saga()
  socialAccountLinked = (event$: Observable<any>): Observable<ICommand> =>
    event$.pipe(
      ofType(SocialAccountLinkedEvent),
      map(
        (event) =>
          new CreateSocialAccountCommand({
            id: event.socialAccountId,
            provider: event.provider,
            socialId: event.socialId,
            userId: event.userId,
            accessToken: event.accessToken,
            refreshToken: event.refreshToken,
          }),
      ),
    );

  @Saga()
  userUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserUpdatedEvent),
      map(
        (event) =>
          new TrackUserImagesCommand({
            type: 'avatar',
            refId: event.userId,
          }),
      ),
    );

  @Saga()
  avatarCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AvatarCreatedEvent),
      concatMap((event) =>
        of(new CreateUserImageCommand(event), new TrackUserImagesCommand(event)),
      ),
    );

  @Saga()
  receivedReportsChecked = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserCheckedReceivedReportsEvent),
      map((event) =>
        event.hasUncommentedReceivedReports
          ? new ConnectRolesCommand(pick(event, ['groupId', 'userId', 'roleIds', 'roleNames']))
          : new DisconnectRolesCommand({
              id: event.memberId,
              roleIds: [],
              roleNames: event.roleNames,
            }),
      ),
    );
}
