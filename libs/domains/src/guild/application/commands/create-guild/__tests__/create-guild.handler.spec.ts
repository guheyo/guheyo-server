import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass } from 'ts-mockito';
import { GuildRepository } from '@lib/domains/guild/adapter/out/persistence/guild.repository';
import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';
import { CreateGuildCommand } from '../create-guild.command';
import { CreateGuildHandler } from '../create-guild.handler';
import { GuildSavePort } from '../../../ports/out/guild.save.port';

describe('CreateGuildHandler', () => {
  let handler: CreateGuildHandler;
  const guildSavePort: GuildSavePort = mock(GuildRepository);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateGuildHandler,
        {
          provide: 'GuildSavePort',
          useValue: instance(guildSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<CreateGuildHandler>(CreateGuildHandler);
  });

  describe('execute', () => {
    it('should execute create', async () => {
      const command: CreateGuildCommand = {
        id: '94587c54-4d7d-11ee-be56-0242ac120002',
        name: 'guild-name',
        position: 0,
      };
      await handler.execute(command);
      verify(guildSavePort.create(anyOfClass(GuildEntity))).once();
    });
  });
});
