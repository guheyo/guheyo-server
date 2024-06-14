import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AddPermissionCommand,
  LambdaClient,
  RemovePermissionCommand,
} from '@aws-sdk/client-lambda';

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
        accessKeyId: this.configService.get<string>('aws.lambda.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.lambda.secretAccessKey')!,
      },
    });
  }

  getLambdaClient(): LambdaClient {
    return this.lambdaClient;
  }

  getLambdaRegion(): string {
    return this.lambdaRegion;
  }

  getLambdaFunctionArn(functionName: string): string {
    return `arn:aws:lambda:${this.lambdaRegion}:${this.awsAccountId}:function:${process.env.NODE_ENV}-${functionName}`;
  }

  async addPermission({
    functionName,
    statementId,
    ruleArn,
  }: {
    functionName: string;
    statementId: string;
    ruleArn: string;
  }) {
    const lambdaArn = this.getLambdaFunctionArn(functionName);
    const addPermissionParams = {
      FunctionName: lambdaArn,
      StatementId: statementId,
      Action: 'lambda:InvokeFunction',
      Principal: 'events.amazonaws.com',
      SourceArn: ruleArn,
    };
    const addPermissionCommand = new AddPermissionCommand(addPermissionParams);
    await this.lambdaClient.send(addPermissionCommand);
  }

  async removePermission({
    functionName,
    statementId,
  }: {
    functionName: string;
    statementId: string;
  }) {
    const lambdaArn = this.getLambdaFunctionArn(functionName);
    const removePermissionCommand = new RemovePermissionCommand({
      FunctionName: lambdaArn,
      StatementId: statementId,
    });
    await this.lambdaClient.send(removePermissionCommand);
  }
}
