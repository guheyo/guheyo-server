import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export abstract class AwsEventService {
  protected functionName: string;

  protected prefix: string;

  constructor({ functionName }: { functionName: string }) {
    this.functionName = functionName;
    this.prefix = `${process.env.NODE_ENV}-${functionName}`;
  }

  protected generateUniqueIdentifier(uuid: string): string {
    return `${this.prefix}-${uuid.slice(0, 8)}-${dayjs().format('YYMMDD')}`;
  }

  protected generateIdentifierWithWildcard(): string {
    return `${this.prefix}-*`;
  }
}
