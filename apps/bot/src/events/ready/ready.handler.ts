import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, Once } from 'necord';

@Injectable()
export class ReadyHandler {
  private readonly logger = new Logger(ReadyHandler.name);

  @Once('ready')
  public async onceReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }
}
