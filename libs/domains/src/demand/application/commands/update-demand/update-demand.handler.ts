import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import _ from 'lodash';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { UpdateDemandCommand } from './update-demand.command';
import { DemandLoadPort } from '../../ports/out/demand.load.port';
import { DemandSavePort } from '../../ports/out/demand.save.port';
import { DemandPreviewResponse } from '../../dtos/demand-preview.response';

@CommandHandler(UpdateDemandCommand)
export class UpdateDemandHandler extends PrismaCommandHandler<
  UpdateDemandCommand,
  DemandPreviewResponse
> {
  constructor(
    @Inject('DemandLoadPort') private demandLoadPort: DemandLoadPort,
    @Inject('DemandSavePort') private demandSavePort: DemandSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(DemandPreviewResponse);
  }

  async execute(command: UpdateDemandCommand): Promise<DemandPreviewResponse> {
    let demand = await this.demandLoadPort.findById(command.id);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_NOT_FOUND);
    if (!demand.isAuthorized(command.user.id))
      throw new ForbiddenException(DemandErrorMessage.DEMAND_CHANGES_FROM_UNAUTHORIZED_USER);
    if (demand.hasUncommentedReports())
      throw new ForbiddenException(DemandErrorMessage.UNCOMMENTED_REPORT_EXISTS);

    demand = this.publisher.mergeObjectContext(demand);
    demand.update(
      _.pick(command, [
        'id',
        'name',
        'description',
        'price',
        'priceCurrency',
        'shippingCost',
        'shippingType',
        'businessFunction',
        'productCategoryId',
        'status',
        'isHidden',
        'brandId',
      ]),
    );
    await this.demandSavePort.save(demand);
    demand.commit();
    return this.parseResponse(demand);
  }
}
