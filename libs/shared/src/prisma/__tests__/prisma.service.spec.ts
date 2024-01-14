import { join } from 'path';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { loadYaml } from '@lib/shared/config';
import { PrismaService } from '../prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [loadYaml(join(__dirname, 'config.test.yaml'), 'utf8')],
        }),
      ],
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    expect(prismaService).toBeDefined();
  });
});
