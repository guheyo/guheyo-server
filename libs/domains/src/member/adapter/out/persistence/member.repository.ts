import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { MemberRolesSavePort } from '@lib/domains/member/application/ports/out/member-roles.save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { MemberSavePort } from '@lib/domains/member/application/ports/out/member.save.port';
import { CreateMembersOfUserInput } from '@lib/domains/member/application/commands/create-members-of-user/create-members-of-user.input';

@Injectable()
export class MemberRepository
  extends PrismaRepository<MemberEntity>
  implements MemberSavePort, MemberRolesSavePort
{
  constructor() {
    super(MemberEntity);
  }

  async findById(id: string): Promise<MemberEntity | null> {
    const member = await this.prismaService.member.findUnique({
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
    return this.toEntity(member);
  }

  async create(member: MemberEntity): Promise<void> {
    await this.prismaService.member.create({
      data: _.pick(member, ['id', 'userId', 'guildId']),
    });
  }

  async createMany(members: MemberEntity[]): Promise<void> {
    await this.prismaService.member.createMany({
      data: members.map((member) => _.pick(member, ['id', 'userId', 'guildId'])),
    });
  }

  async createMembersOfUser(input: CreateMembersOfUserInput): Promise<void> {
    const guilds = await this.prismaService.guild.findMany({
      orderBy: {
        position: 'asc',
      },
    });
    await guilds.map(async (guild) => {
      const guildIdWithRoleIds = input.guildIdWithRoleIdsList.find(
        (guildIdWithRoleId) => guildIdWithRoleId.guildId === guild.id,
      );
      return this.prismaService.member.create({
        data: {
          userId: input.userId,
          guildId: guild.id,
          roles: {
            connect: guildIdWithRoleIds
              ? guildIdWithRoleIds.roleIds.map((roleId) => ({
                  id: roleId,
                }))
              : [],
          },
        },
      });
    });
  }

  async save(member: MemberEntity): Promise<void> {
    await this.prismaService.member.update({
      where: {
        id: member.id,
        userId: member.userId,
      },
      data: _.pick(member, 'guildId'),
    });
  }

  async delete(member: MemberEntity): Promise<void> {
    await this.prismaService.member.delete({
      where: {
        id: member.id,
        userId: member.userId,
      },
    });
  }

  async connectRoles(id: string, roleIds: string[]): Promise<void> {
    await this.prismaService.member.update({
      where: {
        id,
      },
      data: {
        roles: {
          connect: roleIds.map((roleId) => ({
            id: roleId,
          })),
        },
      },
    });
  }

  async disconnectRoles(id: string, roleIds: string[]): Promise<void> {
    await this.prismaService.member.update({
      where: {
        id,
      },
      data: {
        roles: {
          disconnect: roleIds.map((roleId) => ({
            id: roleId,
          })),
        },
      },
    });
  }
}
