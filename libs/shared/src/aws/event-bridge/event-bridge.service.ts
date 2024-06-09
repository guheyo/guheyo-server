import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBridgeClient, PutRuleCommand, RuleState } from '@aws-sdk/client-eventbridge';

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

  async updateRuleSchedule(ruleName: string, newScheduleExpression: string): Promise<void> {
    const params = {
      Name: ruleName,
      ScheduleExpression: newScheduleExpression,
      State: RuleState.ENABLED, // Ensure the rule remains enabled
    };

    try {
      const command = new PutRuleCommand(params);
      await this.eventBridgeClient.send(command);
      console.log(`Updated cron schedule for rule ${ruleName} to ${newScheduleExpression}`);
    } catch (error) {
      console.error(`Error updating cron schedule for rule ${ruleName}:`, error);
      throw error;
    }
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
}
