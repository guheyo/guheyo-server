import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { SessionErrorMessage } from '@lib/domains/session/domain/session.error.message';
import { UpdateSessionCommand } from './update-session.command';
import { SessionLoadPort } from '../../port/out/session.load.port';
import { SessionSavePort } from '../../port/out/session.save.port';

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionHandler implements ICommandHandler<UpdateSessionCommand> {
  constructor(
    @Inject('SessionLoadPort') private sessionLoadPort: SessionLoadPort,
    @Inject('SessionSavePort') private sessionSavePort: SessionSavePort,
  ) {}

  async execute(command: UpdateSessionCommand): Promise<void> {
    const session = await this.sessionLoadPort.findBySessionToken(command.sessionToken);
    if (!session) throw new NotFoundException(SessionErrorMessage.SESSION_IS_NOT_FOUND);

    session.update(_.pick(command, ['sessionToken', 'expires', 'userId']));
    await this.sessionSavePort.save(session);
  }
}
