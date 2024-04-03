import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BumpEntity } from '@lib/domains/bump/domain/bump.entity';
import { pick } from 'lodash';
import { CreateBumpCommand } from './create-bump.command';
import { BumpSavePort } from '../../ports/out/bump.save.port';

@CommandHandler(CreateBumpCommand)
export class CreateBumpHandler implements ICommandHandler<CreateBumpCommand> {
  constructor(@Inject('BumpSavePort') private savePort: BumpSavePort) {}

  async execute(command: CreateBumpCommand): Promise<void> {
    const props = {
      ...pick(command, ['id', 'type', 'oldPrice', 'newPrice']),
      offerId: command.type === 'offer' ? command.refId : undefined,
      demandId: command.type === 'demand' ? command.refId : undefined,
      swapId: command.type === 'swap' ? command.refId : undefined,
    };
    await this.savePort.create(new BumpEntity(props));
  }
}
