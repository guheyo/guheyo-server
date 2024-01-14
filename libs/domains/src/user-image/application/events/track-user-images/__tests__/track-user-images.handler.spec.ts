import { instance, mock, verify } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { UserImageRepository } from '@lib/domains/user-image/adapter/out/persistence/user-image.repository';
import { UserImageSavePort } from '../../../ports/user-image.save.port';
import { TrackUserImagesHandler } from '../track-user-images.handler';
import { TrackUserImagesEvent } from '../track-user-images.event';

describe('TrackUserImage', () => {
  let handler: TrackUserImagesHandler;
  const userImageSavePort: UserImageSavePort = mock(UserImageRepository);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TrackUserImagesHandler,
        {
          provide: 'UserImageSavePort',
          useValue: instance(userImageSavePort),
        },
      ],
    }).compile();

    handler = moduleRef.get<TrackUserImagesHandler>(TrackUserImagesHandler);
  });

  describe('handle', () => {
    it('should execute trackUserImages', async () => {
      const event = new TrackUserImagesEvent({
        type: 'user/avatar',
        refId: '94587c54-4d7d-11ee-be56-0242ac120002',
      });
      await handler.handle(event);
      verify(userImageSavePort.trackImages(event.type, event.refId)).once();
    });
  });
});
