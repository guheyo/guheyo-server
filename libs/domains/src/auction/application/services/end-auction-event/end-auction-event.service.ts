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
    const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
    const input = JSON.stringify({ auctionId });
    const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);

    await this.eventBridgeService.scheduleRule(ruleName, targetId, endTime, lambdaArn, input);
    await this.lambdaService.addPermission(this.functionName, statementId, ruleArn);
  }

  async updateEndAuctionEvent(auctionId: string, endTime: Date): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);
    const scheuldExpression = this.eventBridgeService.generateCronExpression(endTime);

    await this.eventBridgeService.updateRuleSchedule(ruleName, scheuldExpression);
  }

  async cancelEndAuctionEvent(auctionId: string): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);
    const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);

    await this.eventBridgeService.cancelRule(ruleName);
    await this.lambdaService.removePermission(this.functionName, statementId);
  }
}
