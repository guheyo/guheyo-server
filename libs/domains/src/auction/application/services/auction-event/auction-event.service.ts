import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EventBridgeClient,
  ListTargetsByRuleCommand,
  RemoveTargetsCommand,
  DeleteRuleCommand,
  PutRuleCommand,
  PutTargetsCommand,
} from '@aws-sdk/client-eventbridge';

@Injectable()
export class AuctionEventService {
  private readonly eventBridgeClient: EventBridgeClient;

  constructor(private readonly configService: ConfigService) {
    this.eventBridgeClient = new EventBridgeClient({
      region: this.configService.get<string>('eventBridge.region', 'ap-northeast-2'),
    });
  }

  async cancelEndAuctionEvent(auctionId: string): Promise<void> {
    const ruleName = `auction-end-${auctionId}`;

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
    const ruleName = `auction-end-${auctionId}`;
    const scheduleExpression = `cron(${endTime.getUTCMinutes()} ${endTime.getUTCHours()} ${endTime.getUTCDate()} ${
      endTime.getUTCMonth() + 1
    } ? ${endTime.getUTCFullYear()})`;

    try {
      // Create or update the rule
      const putRuleCommand = new PutRuleCommand({
        Name: ruleName,
        ScheduleExpression: scheduleExpression,
        State: 'ENABLED',
      });
      await this.eventBridgeClient.send(putRuleCommand);

      // Add the target
      const lambdaArn = this.configService.get<string>('lambda.endAuction.arn');
      const putTargetsCommand = new PutTargetsCommand({
        Rule: ruleName,
        Targets: [
          {
            Id: `AuctionEndTarget_${auctionId}`,
            Arn: lambdaArn,
            Input: JSON.stringify({ auctionId }),
          },
        ],
      });
      await this.eventBridgeClient.send(putTargetsCommand);
    } catch (error) {
      console.error(`Error scheduling auction end event for auctionId ${auctionId}:`, error);
      throw error;
    }
  }
}
