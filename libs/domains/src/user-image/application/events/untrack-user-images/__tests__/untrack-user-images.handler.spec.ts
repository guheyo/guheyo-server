import { instance, mock, verify } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { UserImageRepository } from '@lib/domains/user-image/adapter/out/persistence/user-image.repository';
import { UserImageSavePort } from '../../../ports/user-image.save.port';
import { UntrackUserImagesHandler } from '../untrack-user-images.handler';
import { UntrackUserImagesEvent } from '../untrack-user-images.event';

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

  describe('handle', () => {
    it('should execute untrackUserImages', async () => {
      const event = new UntrackUserImagesEvent({
        type: 'user/avatar',
        refId: '94587c54-4d7d-11ee-be56-0242ac120002',
      });
      await handler.handle(event);
      verify(userImageSavePort.untrackImages(event.type, event.refId)).once();
    });
  });
});
