import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TrackUserImagesEvent } from './track-user-images.event';
import { UserImageSavePort } from '../../ports/user-image.save.port';

@EventsHandler(TrackUserImagesEvent)
export class TrackUserImagesHandler implements IEventHandler<TrackUserImagesEvent> {
  constructor(@Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort) {}

  async handle(event: TrackUserImagesEvent) {
    await this.userImageSavePort.trackImages(event.type, event.refId);
  }
}
