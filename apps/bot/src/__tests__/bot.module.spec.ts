import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { BotModule } from '../bot.module';

describe('BotModule', () => {
  let necordModule: NecordModule;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BotModule],
    }).compile();

    necordModule = moduleRef.get<NecordModule>(NecordModule);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe('NecordModule', () => {
    it('should be defined', async () => {
      expect(necordModule).toBeDefined();
    });
  });

  describe('ConfigService', () => {
    it('should be defined', async () => {
      expect(configService).toBeDefined();
    });
  });
});
