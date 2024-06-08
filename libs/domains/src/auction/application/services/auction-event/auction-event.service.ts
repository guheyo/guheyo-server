import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AuctionEventService {
  private readonly cloudWatchEvents: AWS.CloudWatchEvents;

  constructor(private readonly configService: ConfigService) {
    this.cloudWatchEvents = new AWS.CloudWatchEvents({ region: 'ap-northeast-2' });
  }

  async cancelAuctionEndEvent(auctionId: string): Promise<void> {
    const ruleName = `AuctionEndRule_${auctionId}`;

    // Remove all targets from the rule
    const listTargetsParams = { Rule: ruleName };
    const listTargetsResponse = await this.cloudWatchEvents
      .listTargetsByRule(listTargetsParams)
      .promise();
    if (!!listTargetsResponse.Targets?.length && listTargetsResponse.Targets.length > 0) {
      const removeTargetsParams = {
        Rule: ruleName,
        Ids: listTargetsResponse.Targets.map((target) => target.Id),
      };
      await this.cloudWatchEvents.removeTargets(removeTargetsParams).promise();
    }

    // Delete the rule
    const deleteRuleParams = { Name: ruleName };
    await this.cloudWatchEvents.deleteRule(deleteRuleParams).promise();
  }

  async scheduleAuctionEndEvent(auctionId: string, endTime: Date): Promise<void> {
    const ruleName = `AuctionEndRule_${auctionId}`;
    const ruleParams = {
      Name: ruleName,
      ScheduleExpression: `cron(${endTime.getUTCMinutes()} ${endTime.getUTCHours()} ${endTime.getUTCDate()} ${
        endTime.getUTCMonth() + 1
      } ? ${endTime.getUTCFullYear()})`,
      State: 'ENABLED',
    };
    await this.cloudWatchEvents.putRule(ruleParams).promise();

    const targetParams = {
      Rule: ruleName,
      Targets: [
        {
          Id: `AuctionEndTarget_${auctionId}`,
          Arn: this.configService.get('lambda.arn'),
          Input: JSON.stringify({ auctionId }),
        },
      ],
    };
    await this.cloudWatchEvents.putTargets(targetParams).promise();
  }
}
