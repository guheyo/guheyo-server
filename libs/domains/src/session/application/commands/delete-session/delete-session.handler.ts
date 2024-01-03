import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SessionErrorMessage } from '@lib/domains/session/domain/session.error.message';
import { DeleteSessionCommand } from './delete-session.command';
import { SessionLoadPort } from '../../port/out/session.load.port';
import { SessionSavePort } from '../../port/out/session.save.port';

@CommandHandler(DeleteSessionCommand)
export class DeleteSessionHandler implements ICommandHandler<DeleteSessionCommand> {
  constructor(
    @Inject('SessionLoadPort') private sessionLoadPort: SessionLoadPort,
    @Inject('SessionSavePort') private sessionSavePort: SessionSavePort,
  ) {}

  async execute(command: DeleteSessionCommand): Promise<void> {
    const session = await this.sessionLoadPort.findBySessionToken(command.sessionToken);
    if (!session) throw new NotFoundException(SessionErrorMessage.SESSION_IS_NOT_FOUND);

    await this.sessionSavePort.delete(session);
  }
}
