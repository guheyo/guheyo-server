import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UntrackUserImagesEvent } from './untrack-user-images.event';
import { UserImageSavePort } from '../../ports/user-image.save.port';

@EventsHandler(UntrackUserImagesEvent)
export class UntrackUserImagesHandler implements IEventHandler<UntrackUserImagesEvent> {
  constructor(@Inject('UserImageSavePort') private readonly userImageSavePort: UserImageSavePort) {}

  async handle(event: UntrackUserImagesEvent) {
    await this.userImageSavePort.untrackImages(event.type, event.refId);
  }
}
