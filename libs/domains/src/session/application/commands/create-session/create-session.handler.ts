import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SessionEntity } from '@lib/domains/session/domain/session.entity';
import { CreateSessionCommand } from './create-session.command';
import { SessionSavePort } from '../../port/out/session.save.port';

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements ICommandHandler<CreateSessionCommand> {
  constructor(@Inject('SessionSavePort') private sessionSavePort: SessionSavePort) {}

  async execute(command: CreateSessionCommand): Promise<void> {
    const session = new SessionEntity(command);
    await this.sessionSavePort.create(session);
  }
}
