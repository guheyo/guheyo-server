import { ConfigYamlModule } from '@lib/config/config-yaml.module';
import { Module } from '@nestjs/common';
import { BotController } from '~bot/src/controllers/bot.controller';
import { Interfaces } from '~bot/src/interfaces';

@Module({
  imports: [ConfigYamlModule],
  controllers: [BotController],
  providers: [...Interfaces],
})
export class BotModule {}
