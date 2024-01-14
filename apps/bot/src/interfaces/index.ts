import { BotRepository } from '@app/bot/repositories/bot.repository';
import { BotService } from '@app/bot/services/bot.service';

export * from './repositories/bot-repository.interface';
export * from './services/bot-service.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Interfaces = [
  {
    provide: 'IBotRepository',
    useClass: BotRepository,
  },

  {
    provide: 'IBotService',
    useClass: BotService,
  },
];
