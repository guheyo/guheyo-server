import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';

@Injectable()
export class WarnHandler {
  private readonly logger = new Logger(WarnHandler.name);

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
