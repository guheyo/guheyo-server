import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { CreateBumpCommand } from './create-bump.command';
import { BumpSavePort } from '../../ports/out/bump.save.port';

@CommandHandler(CreateBumpCommand)
export class CreateBumpHandler implements ICommandHandler<CreateBumpCommand> {
  constructor(@Inject('BumpSavePort') private savePort: BumpSavePort) {}

  async execute(command: CreateBumpCommand): Promise<void> {
    await this.savePort.create(new BumpEntity(command));
  }
}
