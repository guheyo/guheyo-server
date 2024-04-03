import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PRISMA_SERVICE, PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_SERVICE,
      useFactory: (configService: ConfigService) => {
        const client = new PrismaService(configService);
        return client.withExtensions();
      },
      inject: [ConfigService],
    },
  ],
  exports: [PRISMA_SERVICE],
})
export class PrismaModule {}
