import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import _ from 'lodash';
import { UpdateDemandCommand } from './update-demand.command';
import { DemandLoadPort } from '../../ports/out/demand.load.port';
import { DemandSavePort } from '../../ports/out/demand.save.port';

@CommandHandler(UpdateDemandCommand)
export class UpdateDemandHandler implements ICommandHandler<UpdateDemandCommand> {
  constructor(
    @Inject('DemandLoadPort') private demandLoadPort: DemandLoadPort,
    @Inject('DemandSavePort') private demandSavePort: DemandSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateDemandCommand): Promise<void> {
    let demand = await this.demandLoadPort.findById(command.id);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_NOT_FOUND);
    if (!demand.isAuthorized(command.buyerId))
      throw new ForbiddenException(DemandErrorMessage.DEMAND_CHANGES_FROM_UNAUTHORIZED_USER);

    demand = this.publisher.mergeObjectContext(demand);
    demand.update(
      _.pick(command, [
        'id',
        'name',
        'description',
        'price',
        'priceCurrency',
        'businessFunction',
        'productCategoryId',
        'status',
        'brandId',
      ]),
    );
    await this.demandSavePort.save(demand);
    demand.commit();
  }
}
