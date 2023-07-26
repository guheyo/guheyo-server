import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheModuleOptions } from '@nestjs/common/cache';
import { PrismaService } from '@lib/database/prisma.service';

export class DatabaseModule {
  static prismaModule(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }

  static redisModule(options: CacheModuleOptions): DynamicModule {
    return CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<CacheModuleOptions> => {
        const config = configService.get('redis');
        return { ...config, ...options };
      },
    });
  }
}
