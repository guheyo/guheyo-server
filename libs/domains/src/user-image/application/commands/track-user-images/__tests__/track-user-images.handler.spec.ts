import { instance, mock, verify } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { UserImageRepository } from '@lib/domains/user-image/adapter/out/persistence/user-image.repository';
import { UserImageSavePort } from '../../../ports/user-image.save.port';
import { TrackUserImagesHandler } from '../track-user-images.handler';
import { TrackUserImagesCommand } from '../track-user-images.command';

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

  describe('trackImages', () => {
    it('should execute trackUserImages', async () => {
      const command = new TrackUserImagesCommand({
        type: 'user/avatar',
        refId: '94587c54-4d7d-11ee-be56-0242ac120002',
      });
      await handler.execute(command);
      verify(userImageSavePort.trackImages(command.type, command.refId)).once();
    });
  });
});
