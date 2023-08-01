import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadYaml } from '@lib/shared/config/load-yaml';

const YAML_CONFIG_FILENAME = `config.${process.env.NODE_ENV}.yaml`;
const filePath = join(__dirname, 'config', YAML_CONFIG_FILENAME);

@Module({
  imports: [ConfigModule.forRoot({ load: [loadYaml(filePath, 'utf8')], isGlobal: true })],
})
export class ConfigYamlModule {}
