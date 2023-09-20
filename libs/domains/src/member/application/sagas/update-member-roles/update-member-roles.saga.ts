import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, mergeMap, of } from 'rxjs';
import { MemberRolesUpdatedEvent } from '../../events/member-roles-updated/member-roles-updated.event';
import { ConnectRolesCommand } from '../../commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '../../commands/disconnect-roles/disconnect-roles.command';

@Injectable()
export class UpdateMemberRolesSaga {
  @Saga()
  memberRolesUpdated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(MemberRolesUpdatedEvent),
      mergeMap((event) =>
        of(
          new ConnectRolesCommand({
            id: event.id,
            roleIds: event.connectedRoleIds,
          }),
          new DisconnectRolesCommand({
            id: event.id,
            roleIds: event.disconnectedRoleIds,
          }),
        ),
      ),
    );
}
