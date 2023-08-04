import { Inject, Injectable } from '@nestjs/common';
import { IBotRepository, IBotService } from '@app/bot/interfaces';
import { BotException } from '@app/bot/exceptions/bot.exception';

@Injectable()
export class BotService implements IBotService {
  constructor(@Inject('IBotRepository') private readonly botRepository: IBotRepository) {}

  async findOne(id: number): Promise<undefined> {
    const data = await this.botRepository.findOne(id);
    if (!data) {
      throw new BotException().notFound();
    }
    return data;
  }
}
