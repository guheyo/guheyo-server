import { Injectable } from '@nestjs/common';
import { IBotRepository } from '@app/bot/interfaces/repositories/bot-repository.interface';

@Injectable()
export class BotRepository implements IBotRepository {
  async findOne(id: number): Promise<undefined> {
    return undefined;
  }
}
