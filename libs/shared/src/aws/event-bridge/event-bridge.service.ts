import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteRuleCommand,
  EventBridgeClient,
  ListTargetsByRuleCommand,
  PutRuleCommand,
  PutTargetsCommand,
  RemoveTargetsCommand,
  RuleState,
} from '@aws-sdk/client-eventbridge';

@Injectable()
export class EventBridgeService {
  private readonly eventBridgeClient: EventBridgeClient;

  private readonly awsAccountId: string;

  private readonly eventBridgeRegion: string;

  constructor(private readonly configService: ConfigService) {
    this.awsAccountId = this.configService.get<string>('aws.accountId')!;
    this.eventBridgeRegion = this.configService.get<string>(
      'aws.eventBridge.region',
      'ap-northeast-2',
    );
    this.eventBridgeClient = new EventBridgeClient({
      region: this.eventBridgeRegion,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.eventBridge.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.eventBridge.secretAccessKey')!,
      },
    });
  }

  getEventBridgeClient(): EventBridgeClient {
    return this.eventBridgeClient;
  }

  getEventBridgeRegion(): string {
    return this.eventBridgeRegion;
  }

  getRuleName(prefixWithId: string): string {
    return `${prefixWithId}-rule`;
  }

  getRuleArn(ruleName: string): string {
    return `arn:aws:events:${this.eventBridgeRegion}:${this.awsAccountId}:rule/${ruleName}`;
  }

  getTargetId(prefixWithId: string): string {
    return `${prefixWithId}-target`;
  }

  generateCronExpression(endTime: Date): string {
    return `cron(${endTime.getUTCMinutes()} ${endTime.getUTCHours()} ${endTime.getUTCDate()} ${
      endTime.getUTCMonth() + 1
    } ? ${endTime.getUTCFullYear()})`;
  }

  private async putRule(ruleName: string, scheduleExpression: string): Promise<void> {
    const ruleParams = {
      Name: ruleName,
      ScheduleExpression: scheduleExpression,
      State: RuleState.ENABLED,
    };
    const putRuleCommand = new PutRuleCommand(ruleParams);
    await this.eventBridgeClient.send(putRuleCommand);
  }

  private async putTargets(
    ruleName: string,
    targetId: string,
    lambdaArn: string,
    input: string,
  ): Promise<void> {
    const targetParams = {
      Rule: ruleName,
      Targets: [
        {
          Id: targetId,
          Arn: lambdaArn,
          Input: input,
        },
      ],
    };
    const putTargetsCommand = new PutTargetsCommand(targetParams);
    await this.eventBridgeClient.send(putTargetsCommand);
  }

  async scheduleRule(
    ruleName: string,
    targetId: string,
    endTime: Date,
    lambdaArn: string,
    input: string,
  ): Promise<void> {
    const scheduleExpression = this.generateCronExpression(endTime);
    await this.putRule(ruleName, scheduleExpression);
    await this.putTargets(ruleName, targetId, lambdaArn, input);
  }

  async updateRuleSchedule(ruleName: string, newScheduleExpression: string): Promise<void> {
    await this.putRule(ruleName, newScheduleExpression);
  }

  async cancelRule(ruleName: string): Promise<void> {
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
      console.error(`Error cancelling rule for ${ruleName}:`, error);
      throw error;
    }
  }
}
