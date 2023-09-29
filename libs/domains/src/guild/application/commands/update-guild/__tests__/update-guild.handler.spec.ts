import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { GuildRepository } from '@lib/domains/guild/adapter/out/persistence/guild.repository';
import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';
import { UpdateGuildCommand } from '../update-guild.command';
import { UpdateGuildHandler } from '../update-guild.handler';
import { GuildLoadPort } from '../../../ports/out/guild.load.port';
import { GuildSavePort } from '../../../ports/out/guild.save.port';

describe('UpdateGuildHandler', () => {
  let handler: UpdateGuildHandler;
  const guildLoadPort: GuildLoadPort = mock(GuildRepository);
  const roleSavePort: GuildSavePort = mock(GuildRepository);
  const command: UpdateGuildCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
    name: 'role-name',
    position: 0,
  };
  when(guildLoadPort.findById(command.id)).thenResolve(new GuildEntity(command));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateGuildHandler,
        {
          provide: 'GuildLoadPort',
          useValue: instance(guildLoadPort),
        },
        {
          provide: 'GuildSavePort',
          useValue: instance(roleSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UpdateGuildHandler>(UpdateGuildHandler);
  });

  describe('execute', () => {
    it('should execute update', async () => {
      await handler.execute(command);
      verify(roleSavePort.save(anyOfClass(GuildEntity))).once();
    });
  });
});
