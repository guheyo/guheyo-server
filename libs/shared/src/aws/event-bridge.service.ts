import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';

@Injectable()
export class EventBridgeService {
  private readonly eventBridgeClient: EventBridgeClient;

  private readonly eventBridgeRegion: string;

  constructor(private readonly configService: ConfigService) {
    this.eventBridgeRegion = this.configService.get<string>(
      'aws.eventBridge.region',
      'ap-northeast-2',
    );
    this.eventBridgeClient = new EventBridgeClient({
      region: this.eventBridgeRegion,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.eventBridge.accessKeyId'),
        secretAccessKey: this.configService.get<string>('aws.eventBridge.secretAccessKey'),
      },
    });
  }

  getEventBridgeClient(): EventBridgeClient {
    return this.eventBridgeClient;
  }

  getEventBridgeRegion(): string {
    return this.eventBridgeRegion;
  }
}
