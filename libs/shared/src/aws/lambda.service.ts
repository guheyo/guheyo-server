import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LambdaClient } from '@aws-sdk/client-lambda';

@Injectable()
export class LambdaService {
  private readonly lambdaClient: LambdaClient;

  private readonly lambdaRegion: string;

  constructor(private readonly configService: ConfigService) {
    this.lambdaRegion = this.configService.get<string>('aws.lambda.region', 'ap-northeast-2');
    this.lambdaClient = new LambdaClient({
      region: this.lambdaRegion,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.lambda.accessKeyId'),
        secretAccessKey: this.configService.get<string>('aws.lambda.secretAccessKey'),
      },
    });
  }

  getLambdaClient(): LambdaClient {
    return this.lambdaClient;
  }

  getLambdaRegion(): string {
    return this.lambdaRegion;
  }
}
