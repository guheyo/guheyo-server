import { Injectable } from '@nestjs/common';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { EventBridgeService } from '@lib/shared/aws/event-bridge/event-bridge.service';
import { LambdaService } from '@lib/shared/aws/lambda/lambda.service';

@Injectable()
export class EndAuctionEventService {
  private readonly eventBridgeClient: EventBridgeClient;

  private readonly lambdaClient: LambdaClient;

  private readonly functionName: string = 'end-auction';

  private readonly prefix: string = `${process.env.NODE_ENV}-${this.functionName}`;

  constructor(
    private readonly eventBridgeService: EventBridgeService,
    private readonly lambdaService: LambdaService,
  ) {
    this.eventBridgeClient = this.eventBridgeService.getEventBridgeClient();
    this.lambdaClient = this.lambdaService.getLambdaClient();
  }

  private getPrefixWithId(auctionId: string): string {
    return `${this.prefix}-${auctionId}`;
  }

  async scheduleEndAuctionEvent(auctionId: string, endTime: Date): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);
    const ruleArn = this.eventBridgeService.getRuleArn(ruleName);
    const targetId = this.eventBridgeService.getTargetId(prefixWithId);
    // Trigger Event after 1 minute
    const delayedEndTime = this.eventBridgeService.getDelayedEndTime(endTime);
    const scheduleExpression = this.eventBridgeService.generateCronExpression(delayedEndTime);
    const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
    const input = JSON.stringify({ auctionId, extendedEndDate: endTime });
    const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);

    await this.eventBridgeService.scheduleRule(
      ruleName,
      targetId,
      scheduleExpression,
      lambdaArn,
      input,
    );
    await this.lambdaService.addPermission({
      functionName: this.functionName,
      statementId,
      ruleArn,
    });
  }

  async updateEndAuctionEvent(auctionId: string, endTime: Date): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);
    // Trigger Event after 1 minute
    const delayedEndTime = this.eventBridgeService.getDelayedEndTime(endTime);
    const scheuldExpression = this.eventBridgeService.generateCronExpression(delayedEndTime);

    await this.eventBridgeService.updateRuleSchedule(ruleName, scheuldExpression);
  }

  async cancelEndAuctionEvent(auctionId: string): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);
    const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);

    await this.eventBridgeService.cancelRule(ruleName);
    await this.lambdaService.removePermission({
      functionName: this.functionName,
      statementId,
    });
  }
}
