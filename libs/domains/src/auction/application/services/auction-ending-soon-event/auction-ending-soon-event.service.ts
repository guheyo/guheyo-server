import { Injectable } from '@nestjs/common';
import { EventBridgeService } from '@lib/shared/aws/event-bridge/event-bridge.service';
import { LambdaService } from '@lib/shared/aws/lambda/lambda.service';

@Injectable()
export class AuctionEndingSoonEventService {
  private readonly functionName: string = 'auction-ending-soon';

  private readonly prefix: string = `${process.env.NODE_ENV}-${this.functionName}`;

  constructor(
    private readonly eventBridgeService: EventBridgeService,
    private readonly lambdaService: LambdaService,
  ) {}

  private getPrefixWithId(auctionId: string): string {
    return `${this.prefix}-${auctionId}`;
  }

  async scheduleAuctionEndingSoonEvent(auctionId: string, endTime: Date): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleArn = this.eventBridgeService.getRuleArn(prefixWithId);
    // Trigger Event before 1 hour
    const oneHourBeforeEndTime = this.eventBridgeService.getDelayedEndTime(
      endTime,
      // -1 * 60 * 60000,
      -1 * 1 * 60000,
    );
    const scheduleExpression = this.eventBridgeService.generateCronExpression(oneHourBeforeEndTime);
    const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
    const input = JSON.stringify({ auctionId, extendedEndDate: endTime });
    const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);

    await this.eventBridgeService.scheduleRule({
      ruleName: prefixWithId,
      targetId: prefixWithId,
      scheduleExpression,
      lambdaArn,
      input,
    });
    await this.lambdaService.addPermission({
      functionName: this.functionName,
      statementId,
      ruleArn,
    });
  }
}
