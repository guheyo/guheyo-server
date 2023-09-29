import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { MemberRolesSavePort } from '@lib/domains/member/application/ports/out/member-roles.save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';

@Injectable()
export class MemberRepository
  extends PrismaRepository<MemberEntity>
  implements MemberRolesSavePort
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
