import { BotRepository } from "~bot/src/repositories/bot.repository";
import { BotService } from "~bot/src/services/bot.service";

export * from "./repositories/bot-repository.interface";
export * from "./services/bot-service.interface";

export const Interfaces = [
  {
    provide: "IBotRepository",
    useClass: BotRepository,
  },

  {
    provide: "IBotService",
    useClass: BotService,
  },
];
