import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Message, ThreadChannel } from 'discord.js';
import { Observable } from 'rxjs';

@Injectable()
export class CommentMessageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate({ message });
  }

  async validate({ message }: { message: Message }): Promise<boolean> {
    const { channel } = message;
    if (!(channel instanceof ThreadChannel)) {
      return false;
    }
    return message.id !== message.channelId;
  }
}
