import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';

async function bootstrap() {
  NestFactory.createApplicationContext(BotModule);
}

bootstrap();
