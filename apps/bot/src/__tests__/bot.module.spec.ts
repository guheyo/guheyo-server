import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { ConfigYamlModule } from '../config/config.module';
import { NecordConfigService } from '../necord/necord.config.service';
import { EVENT_HANDLERS } from '../events/event-handlers';
import { COMMAND_HANDLERS } from '../commands/command-handlers';

describe('BotModule', () => {
  let necordModule: NecordModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigYamlModule,
        NecordModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            token: configService.get('discord.bot.token')!,
            intents: [
              'Guilds',
              'GuildMembers',
              'GuildMessages',
              'GuildMessageReactions',
              'MessageContent',
            ],
          }),
          inject: [ConfigService],
          useClass: NecordConfigService,
        }),
      ],
      providers: [...EVENT_HANDLERS, ...COMMAND_HANDLERS],
    }).compile();

    necordModule = moduleRef.get<NecordModule>(NecordModule);
  });

  describe('NecordModule', () => {
    it('should be defined', async () => {
      expect(necordModule).toBeDefined();
    });
  });
});
