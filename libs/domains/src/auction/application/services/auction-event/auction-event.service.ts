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

  private readonly eventBridgeRegion: string;

  private readonly lambdaRegion: string;

  private readonly awsAccountId: string;

  private readonly prefix: string = `${process.env.NODE_ENV}-end-auction`;

  constructor(private readonly configService: ConfigService) {
    this.eventBridgeRegion = this.configService.get<string>(
      'aws.eventBridge.region',
      'ap-northeast-2',
    );
    this.lambdaRegion = this.configService.get<string>('aws.lambda.region', 'ap-northeast-2');
    this.awsAccountId = this.configService.get<string>('aws.accountId')!;
    this.eventBridgeClient = new EventBridgeClient({
      region: this.eventBridgeRegion,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.eventBridge.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.eventBridge.secretAccessKey')!,
      },
    });
    this.lambdaClient = new LambdaClient({
      region: this.lambdaRegion,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.lambda.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.lambda.secretAccessKey')!,
      },
    });
  }

  private getRuleName(auctionId: string): string {
    return `${this.prefix}-rule-${auctionId}`;
  }

  private getTargetId(auctionId: string): string {
    return `${this.prefix}-target-${auctionId}`;
  }

  private getStatementId(auctionId: string): string {
    return `${this.prefix}-eventbridge-invoke-${auctionId}`;
  }

  private getRuleArn(ruleName: string): string {
    return `arn:aws:events:${this.eventBridgeRegion}:${this.awsAccountId}:rule/${ruleName}`;
  }

  private getLambdaFunctionArn(functionName: string): string {
    return `arn:aws:lambda:${this.lambdaRegion}:${this.awsAccountId}:function:${functionName}`;
  }

  async cancelEndAuctionEvent(auctionId: string): Promise<void> {
    const ruleName = this.getRuleName(auctionId);

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
    const ruleName = this.getRuleName(auctionId);
    const lambdaArn = this.getLambdaFunctionArn('end-auction');
    const ruleArn = this.getRuleArn(ruleName);
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
      StatementId: this.getStatementId(auctionId),
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
          Id: this.getTargetId(auctionId),
          Arn: lambdaArn,
          Input: JSON.stringify({ auctionId }),
        },
      ],
    };

    const putTargetsCommand = new PutTargetsCommand(targetParams);
    await this.eventBridgeClient.send(putTargetsCommand);
  }
}
