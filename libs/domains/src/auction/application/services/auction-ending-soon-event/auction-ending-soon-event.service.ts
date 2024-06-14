import { Injectable } from '@nestjs/common';
import { EventBridgeService } from '@lib/shared/aws/event-bridge/event-bridge.service';
import { LambdaService } from '@lib/shared/aws/lambda/lambda.service';
import { AwsEventService } from '@lib/shared/aws/aws-event-service/aws-event.service';

@Injectable()
export class AuctionEndingSoonEventService extends AwsEventService {
  constructor(
    private readonly eventBridgeService: EventBridgeService,
    private readonly lambdaService: LambdaService,
  ) {
    super({
      functionName: 'auction-ending-soon',
    });
  }

  async scheduleAuctionEndingSoonEvent(auctionId: string, endTime: Date): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleArn = this.eventBridgeService.getRuleArn({
      ruleName: prefixWithId,
    });
    // Trigger Event before 1 hour
    const oneHourBeforeEndTime = this.eventBridgeService.getDelayedEndTime(
      endTime,
      -1 * 60 * 60000,
    );
    const scheduleExpression = this.eventBridgeService.generateCronExpression(oneHourBeforeEndTime);
    const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
    const input = JSON.stringify({ auctionId, extendedEndDate: endTime });

    await this.eventBridgeService.scheduleRule({
      ruleName: prefixWithId,
      targetId: prefixWithId,
      scheduleExpression,
      lambdaArn,
      input,
    });
    await this.lambdaService.addPermission({
      functionName: this.functionName,
      statementId: prefixWithId,
      ruleArn,
    });
  }
}
