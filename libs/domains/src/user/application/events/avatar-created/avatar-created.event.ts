import { IEvent } from '@nestjs/cqrs';
import { AvatarCreatedInput } from './avatar-created.input';

export class AvatarCreatedEvent implements IEvent {
  id: string;

  name: string;

  url: string;

  contentType?: string;

  position: number;

  type: string;

  refId: string;

  tracked: boolean;

  userId: string;

  source: string;

  constructor(input: AvatarCreatedInput) {
    this.id = input.id;
    this.name = input.name;
    this.url = input.url;
    this.contentType = input.contentType;
    this.position = 0;
    this.type = 'avatar';
    this.refId = input.userId;
    this.tracked = true;
    this.userId = input.userId;
    this.source = input.source;
  }
}
