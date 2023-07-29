import { ConfigYamlModule } from '@lib/config/config-yaml.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@lib/database/database.module';
import * as redisStore from 'cache-manager-redis-store';
import { UserController } from '~api/src/controllers/user.controller';
import { Interfaces } from '~api/src/interfaces';

@Module({
  imports: [
    ConfigYamlModule,
    DatabaseModule.prismaModule(),
    DatabaseModule.redisModule({ ttl: 0, store: redisStore }),
  ],
  controllers: [UserController],
  providers: [...Interfaces],
})
export class ApiModule {}
