import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DemandEntity } from '@lib/domains/demand/domain/demand.entity';
import { CreateDemandCommand } from './create-demand.command';
import { DemandSavePort } from '../../ports/out/demand.save.port';

@CommandHandler(CreateDemandCommand)
export class CreateDemandHandler implements ICommandHandler<CreateDemandCommand> {
  constructor(
    @Inject('DemandSavePort') private savePort: DemandSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateDemandCommand): Promise<void> {
    const demand = this.publisher.mergeObjectContext(new DemandEntity(command));
    demand.create();
    await this.savePort.create(demand);
    demand.commit();
  }
}
