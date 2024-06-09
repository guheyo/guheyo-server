import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LambdaClient } from '@aws-sdk/client-lambda';

@Injectable()
export class LambdaService {
  private readonly lambdaClient: LambdaClient;

  private readonly awsAccountId: string;

  private readonly lambdaRegion: string;

  constructor(private readonly configService: ConfigService) {
    this.awsAccountId = this.configService.get<string>('aws.accountId')!;
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

  getEventBridgeInvokeStatementId(prefixWithId: string): string {
    return `${prefixWithId}-eventbridge-invoke`;
  }

  getLambdaFunctionArn(functionName: string): string {
    return `arn:aws:lambda:${this.lambdaRegion}:${this.awsAccountId}:function:${functionName}`;
  }
}
