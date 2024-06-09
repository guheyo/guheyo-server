import { Injectable } from '@nestjs/common';
import {
  EventBridgeClient,
  ListTargetsByRuleCommand,
  RemoveTargetsCommand,
  DeleteRuleCommand,
  PutRuleCommand,
  PutTargetsCommand,
  RuleState,
} from '@aws-sdk/client-eventbridge';
import {
  LambdaClient,
  AddPermissionCommand,
  RemovePermissionCommand,
} from '@aws-sdk/client-lambda';
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

  async cancelEndAuctionEvent(auctionId: string): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);
    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);

    try {
      // List all targets for the rule
      const listTargetsByRuleCommand = new ListTargetsByRuleCommand({ Rule: ruleName });
      const listTargetsResponse = await this.eventBridgeClient.send(listTargetsByRuleCommand);

      // Remove targets if any are found
      if (listTargetsResponse.Targets && listTargetsResponse.Targets.length > 0) {
        const targetIds = listTargetsResponse.Targets.map((target) => target.Id).filter(
          Boolean,
        ) as string[];
        const removeTargetsCommand = new RemoveTargetsCommand({
          Rule: ruleName,
          Ids: targetIds,
        });
        await this.eventBridgeClient.send(removeTargetsCommand);
      }

      // Delete the rule
      const deleteRuleCommand = new DeleteRuleCommand({ Name: ruleName });
      await this.eventBridgeClient.send(deleteRuleCommand);

      // Remove Lambda permission
      const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
      const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);
      const removePermissionCommand = new RemovePermissionCommand({
        FunctionName: lambdaArn,
        StatementId: statementId,
      });
      await this.lambdaClient.send(removePermissionCommand);
    } catch (error) {
      console.error(`Error cancelling auction end event for auctionId ${auctionId}:`, error);
      throw error;
    }
  }

  async scheduleEndAuctionEvent(auctionId: string, endTime: Date): Promise<void> {
    const prefixWithId = this.getPrefixWithId(auctionId);

    const ruleName = this.eventBridgeService.getRuleName(prefixWithId);
    const ruleArn = this.eventBridgeService.getRuleArn(ruleName);
    const targetId = this.eventBridgeService.getTargetId(prefixWithId);
    const ruleParams = {
      Name: ruleName,
      ScheduleExpression: `cron(${endTime.getUTCMinutes()} ${endTime.getUTCHours()} ${endTime.getUTCDate()} ${
        endTime.getUTCMonth() + 1
      } ? ${endTime.getUTCFullYear()})`,
      State: RuleState.ENABLED,
    };

    const putRuleCommand = new PutRuleCommand(ruleParams);
    await this.eventBridgeClient.send(putRuleCommand);

    const lambdaArn = this.lambdaService.getLambdaFunctionArn(this.functionName);
    const statementId = this.lambdaService.getEventBridgeInvokeStatementId(prefixWithId);
    const addPermissionParams = {
      FunctionName: lambdaArn,
      StatementId: statementId,
      Action: 'lambda:InvokeFunction',
      Principal: 'events.amazonaws.com',
      SourceArn: ruleArn,
    };

    const addPermissionCommand = new AddPermissionCommand(addPermissionParams);
    await this.lambdaClient.send(addPermissionCommand);

    const targetParams = {
      Rule: ruleName,
      Targets: [
        {
          Id: targetId,
          Arn: lambdaArn,
          Input: JSON.stringify({ auctionId }),
        },
      ],
    };

    const putTargetsCommand = new PutTargetsCommand(targetParams);
    await this.eventBridgeClient.send(putTargetsCommand);
  }
}
