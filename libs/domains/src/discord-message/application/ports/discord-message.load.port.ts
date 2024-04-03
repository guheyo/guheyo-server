import { LoadPort } from '@lib/shared/cqrs/ports/load.port';
import { DiscordMessageEntity } from '../../domain/discord-message.entity';

export interface DiscordMessageLoadPort extends LoadPort<DiscordMessageEntity> {}
