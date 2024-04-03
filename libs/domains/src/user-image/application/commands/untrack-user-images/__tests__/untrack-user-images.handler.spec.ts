import { instance, mock, verify } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { UserImageRepository } from '@lib/domains/user-image/adapter/out/persistence/user-image.repository';
import { UserImageSavePort } from '../../../ports/user-image.save.port';
import { UntrackUserImagesHandler } from '../untrack-user-images.handler';
import { UntrackUserImagesCommand } from '../untrack-user-images.command';

describe('UntrackUserImage', () => {
  let handler: UntrackUserImagesHandler;
  const userImageSavePort: UserImageSavePort = mock(UserImageRepository);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UntrackUserImagesHandler,
        {
          provide: 'UserImageSavePort',
          useValue: instance(userImageSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<UntrackUserImagesHandler>(UntrackUserImagesHandler);
  });

  describe('untrackUserImages', () => {
    it('should execute untrackUserImages', async () => {
      const command = new UntrackUserImagesCommand({
        type: 'user/avatar',
        refId: '94587c54-4d7d-11ee-be56-0242ac120002',
      });
      await handler.execute(command);
      verify(userImageSavePort.untrackImages(command.type, command.refId)).once();
    });
  });
});
