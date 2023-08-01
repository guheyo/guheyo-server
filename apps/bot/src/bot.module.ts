import { ConfigYamlModule } from '@app/bot/config/config.module';
import { Module } from '@nestjs/common';
import { BotController } from '@app/bot/controllers/bot.controller';
import { Interfaces } from '@app/bot/interfaces';

@Module({
  imports: [ConfigYamlModule],
  controllers: [BotController],
  providers: [...Interfaces],
})
export class BotModule {}
