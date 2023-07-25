import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationYaml from './configuration.yaml';

@Module({
  imports: [ConfigModule.forRoot({ load: [configurationYaml], isGlobal: true })],
})
export class ConfigYamlModule {}
