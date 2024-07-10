import { Injectable } from '@nestjs/common';
import { EventBridgeService } from '@lib/shared/aws/event-bridge/event-bridge.service';
import { LambdaService } from '@lib/shared/aws/lambda/lambda.service';
import { AwsEventService } from '@lib/shared/aws/aws-event-service/aws-event.service';

@Injectable()
export class AuctionEndEventService extends AwsEventService {
  constructor(
    private readonly eventBridgeService: EventBridgeService,
    private readonly lambdaService: LambdaService,
  ) {
    super({
      functionName: 'auction-end',
    });
  }

  async scheduleAuctionEndEvent(auctionId: string, endTime: Date): Promise<void> {
    const uniqueIdentifier = this.generateUniqueIdentifier(auctionId);
    // Trigger Event after 1 minute
    const delayedEndTime = this.eventBridgeService.getDelayedEndTime(endTime);
    const scheduleExpression = this.eventBridgeService.generateCronExpression(delayedEndTime);
    const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
    const input = JSON.stringify({ auctionId, extendedEndDate: endTime });

    await this.eventBridgeService.scheduleRule({
      ruleName: uniqueIdentifier,
      targetId: uniqueIdentifier,
      scheduleExpression,
      lambdaArn,
      input,
    });
  }

  async updateAuctionEndEvent(auctionId: string, endTime: Date): Promise<void> {
    const uniqueIdentifier = this.generateUniqueIdentifier(auctionId);
    // Trigger Event after 1 minute
    const delayedEndTime = this.eventBridgeService.getDelayedEndTime(endTime);
    const scheduleExpression = this.eventBridgeService.generateCronExpression(delayedEndTime);

    await this.eventBridgeService.updateRuleSchedule({
      ruleName: uniqueIdentifier,
      scheduleExpression,
    });
  }

  async cancelAuctionEndEvent(auctionId: string): Promise<void> {
    const uniqueIdentifier = this.generateUniqueIdentifier(auctionId);

    await this.eventBridgeService.cancelRule({
      ruleName: uniqueIdentifier,
    });
  }
}
