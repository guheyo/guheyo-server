import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { MemberRolesSavePort } from '@lib/domains/member/application/port/out/member-roles.save';

@Injectable()
export class MemberRepository implements SavePort<MemberEntity>, MemberRolesSavePort {
  constructor(private prismaService: PrismaService) {}

  async create(member: MemberEntity): Promise<void> {
    await this.prismaService.member.create({
      data: member,
    });
  }

  async update(member: MemberEntity): Promise<void> {
    // NOTE: Do not change anything
    await this.prismaService.member.update({
      where: {
        id: member.id,
        userId: member.userId,
      },
      data: member,
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
