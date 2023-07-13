import { Injectable } from "@nestjs/common";
import { IBotRepository } from "~bot/src/interfaces/repositories/bot-repository.interface";

@Injectable()
export class BotRepository implements IBotRepository {
  constructor() {}

  async findOne(id: number): Promise<undefined> {
    return undefined;
  }
}
