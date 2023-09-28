import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { GuildEntity } from '@lib/domains/guild/domain/guild.entity';

@Injectable()
export class GuildRepository extends PrismaRepository<GuildEntity> {
  constructor() {
    super(GuildEntity);
  }

  async findById(id: string): Promise<GuildEntity | null> {
    const guild = await this.prismaService.guild.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return this.toEntity(guild);
  }

  async create(guild: GuildEntity): Promise<void> {
    await this.prismaService.guild.create({
      data: _.pick(guild, ['id', 'name', 'description', 'icon', 'position']),
    });
  }

  async save(guild: GuildEntity): Promise<void> {
    await this.prismaService.guild.update({
      where: {
        id: guild.id,
      },
      data: _.pick(guild, ['name', 'description', 'icon', 'position']),
    });
  }

  async delete(guild: GuildEntity): Promise<void> {
    await this.prismaService.guild.delete({
      where: {
        id: guild.id,
      },
    });
  }
}
