import { Injectable } from '@nestjs/common';
import dayjs from '@lib/shared/dayjs/dayjs-config';

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
}
