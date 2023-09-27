import { Test } from '@nestjs/testing';
import { mock, verify, instance, anyOfClass, when } from 'ts-mockito';
import { GuildRepository } from '@lib/domains/guild/adapter/out/persistence/guild.repository';
import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';
import { DeleteGuildCommand } from '../delete-guild.command';
import { DeleteGuildHandler } from '../delete-guild.handler';
import { GuildLoadPort } from '../../../ports/out/guild.load.port';
import { GuildSavePort } from '../../../ports/out/guild.save.port';

describe('DeleteGuildHandler', () => {
  let handler: DeleteGuildHandler;
  const guildLoadPort: GuildLoadPort = mock(GuildRepository);
  const guildSavePort: GuildSavePort = mock(GuildRepository);
  const command: DeleteGuildCommand = {
    id: '94587c54-4d7d-11ee-be56-0242ac120002',
  };
  when(guildLoadPort.findById(command.id)).thenResolve(
    new GuildEntity({
      id: command.id,
    }),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteGuildHandler,
        {
          provide: 'GuildLoadPort',
          useValue: instance(guildLoadPort),
        },
        {
          provide: 'GuildSavePort',
          useValue: instance(guildSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<DeleteGuildHandler>(DeleteGuildHandler);
  });

  describe('execute', () => {
    it('should execute delete', async () => {
      await handler.execute(command);
      verify(guildSavePort.delete(anyOfClass(GuildEntity))).once();
    });
  });
});
