import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface GuildLoadPort extends LoadPort<GuildEntity> {}
