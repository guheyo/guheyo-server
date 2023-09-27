import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface GuildSavePort extends SavePort<GuildEntity> {}
