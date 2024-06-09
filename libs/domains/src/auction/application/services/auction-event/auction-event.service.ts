import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EventBridgeClient,
  ListTargetsByRuleCommand,
  RemoveTargetsCommand,
  DeleteRuleCommand,
  PutRuleCommand,
  PutTargetsCommand,
  RuleState,
} from '@aws-sdk/client-eventbridge';
import { LambdaClient, AddPermissionCommand } from '@aws-sdk/client-lambda';

@Injectable()
export class AuctionEventService {
  private readonly eventBridgeClient: EventBridgeClient;

  private readonly lambdaClient: LambdaClient;

  constructor(private readonly configService: ConfigService) {
    this.eventBridgeClient = new EventBridgeClient({
      region: this.configService.get<string>('aws.eventBridge.region', 'ap-northeast-2'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.eventBridge.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.eventBridge.secretAccessKey')!,
      },
    });
    this.lambdaClient = new LambdaClient({
      region: this.configService.get<string>('aws.lambda.region', 'ap-northeast-2'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.lambda.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.lambda.secretAccessKey')!,
      },
    });
  }

  async cancelEndAuctionEvent(auctionId: string): Promise<void> {
    const ruleName = `end-auction-rule-${auctionId}`;

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
    } catch (error) {
      console.error(`Error cancelling auction end event for auctionId ${auctionId}:`, error);
      throw error;
    }
  }

  async scheduleEndAuctionEvent(auctionId: string, endTime: Date): Promise<void> {
    const ruleName = `end-auction-rule-${auctionId}`;
    const lambdaArn = this.configService.get<string>('aws.lambda.endAuction.arn');
    const ruleArn = `arn:aws:events:${this.configService.get<string>(
      'eventBridge.region',
      'ap-northeast-2',
    )}:${this.configService.get<string>('aws.accountId')}:rule/${ruleName}`;

    const ruleParams = {
      Name: ruleName,
      ScheduleExpression: `cron(${endTime.getUTCMinutes()} ${endTime.getUTCHours()} ${endTime.getUTCDate()} ${
        endTime.getUTCMonth() + 1
      } ? ${endTime.getUTCFullYear()})`,
      State: RuleState.ENABLED,
    };

    const putRuleCommand = new PutRuleCommand(ruleParams);
    await this.eventBridgeClient.send(putRuleCommand);

    const addPermissionParams = {
      FunctionName: lambdaArn,
      StatementId: `eventbridge-invoke-${auctionId}`,
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
          Id: `end-auction-target-${auctionId}`,
          Arn: lambdaArn,
          Input: JSON.stringify({ auctionId }),
        },
      ],
    };

    const putTargetsCommand = new PutTargetsCommand(targetParams);
    await this.eventBridgeClient.send(putTargetsCommand);
  }
}
