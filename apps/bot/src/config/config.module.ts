import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadYaml } from '@lib/shared';

const YAML_CONFIG_FILENAME = `config.${process.env.NODE_ENV}.yaml`;
let filePath;
if (process.env.NODE_ENV === 'test') {
  filePath = join(__dirname, YAML_CONFIG_FILENAME);
} else {
  filePath = join(__dirname, 'config', YAML_CONFIG_FILENAME);
}

@Module({
  imports: [ConfigModule.forRoot({ load: [loadYaml(filePath, 'utf8')], isGlobal: true })],
})
export class ConfigYamlModule {}
