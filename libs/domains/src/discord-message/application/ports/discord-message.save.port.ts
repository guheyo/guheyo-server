import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { DiscordMessageEntity } from '../../domain/discord-message.entity';

export interface DiscordMessageSavePort extends SavePort<DiscordMessageEntity> {}
