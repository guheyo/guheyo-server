import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { DemandEntity } from '@lib/domains/demand/domain/demand.entity';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { CreateDemandCommand } from './create-demand.command';
import { DemandSavePort } from '../../ports/out/demand.save.port';

@CommandHandler(CreateDemandCommand)
export class CreateDemandHandler implements ICommandHandler<CreateDemandCommand> {
  constructor(
    @Inject('DemandSavePort') private savePort: DemandSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateDemandCommand): Promise<void> {
    if (command.buyerId !== command.user.id)
      throw new ForbiddenException(DemandErrorMessage.CREATE_REQUEST_FROM_UNAUTHORIZED_USER);

    const demand = this.publisher.mergeObjectContext(new DemandEntity(command));
    demand.create();
    await this.savePort.create(demand);
    demand.commit();
  }
}
