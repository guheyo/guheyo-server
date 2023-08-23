import { ConfigYamlModule } from '@app/bot/config/config.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigYamlModule],
  controllers: [],
  providers: [],
})
export class BotModule {}
