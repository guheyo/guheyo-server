import { paginated } from '@lib/shared/cqrs/queries/pagination/paginated';
import { ObjectType } from '@nestjs/graphql';
import { GuildResponse } from '../../dtos/guild.response';

@ObjectType()
export class PaginatedGuildsResponse extends paginated<GuildResponse>(GuildResponse) {}
