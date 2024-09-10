import { IEvent } from '@nestjs/cqrs';
import { AvatarCreatedInput } from './avatar-created.input';

export class AvatarCreatedEvent implements IEvent {
  id: string;

  url: string;

  contentType?: string;

  position: number;

  type: string;

  refId: string;

  userId: string;

  constructor(input: AvatarCreatedInput) {
    this.id = input.id;
    this.url = input.url;
    this.contentType = input.contentType;
    this.position = 0;
    this.type = 'avatar';
    this.refId = input.userId;
    this.userId = input.userId;
  }
}
