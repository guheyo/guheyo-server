import { Module } from '@nestjs/common';
import { ConfigYamlModule } from '@app/api/config/config.module';

@Module({
  imports: [ConfigYamlModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
