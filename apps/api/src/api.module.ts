import { Module } from '@nestjs/common';
import { UserController } from '@app/api/controllers/user.controller';
import { Interfaces } from '@app/api/interfaces';
import { ConfigYamlModule } from '@app/api/config/config.module';

@Module({
  imports: [ConfigYamlModule],
  controllers: [UserController],
  providers: [...Interfaces],
})
export class ApiModule {}
