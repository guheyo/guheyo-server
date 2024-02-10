import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { MemberRolesSavePort } from '@lib/domains/member/application/ports/out/member-roles.save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { MemberSavePort } from '@lib/domains/member/application/ports/out/member.save.port';
import { CreateMembersOfUserInput } from '@lib/domains/member/application/commands/create-members-of-user/create-members-of-user.input';
import { MemberRolesLoadPort } from '@lib/domains/member/application/ports/out/member-roles.load.port';

@Injectable()
export class MemberRepository
  extends PrismaRepository<MemberEntity>
  implements MemberSavePort, MemberRolesSavePort, MemberRolesLoadPort
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

  async find(groupId: string, userId: string): Promise<MemberEntity | null> {
    const member = await this.prismaService.member.findFirst({
      where: {
        groupId,
        userId,
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

  async findRoleIds(groupId: string, roleNames: string[]): Promise<string[]> {
    const roles = await this.prismaService.role.findMany({
      where: {
        groupId,
        name: {
          in: roleNames,
        },
      },
    });
    return roles.map((role) => role.id);
  }

  async create(member: MemberEntity): Promise<void> {
    await this.prismaService.member.create({
      data: _.pick(member, ['id', 'userId', 'groupId']),
    });
  }

  async createMany(members: MemberEntity[]): Promise<void> {
    await this.prismaService.member.createMany({
      data: members.map((member) => _.pick(member, ['id', 'userId', 'groupId'])),
    });
  }

  async createMembersOfUser(input: CreateMembersOfUserInput): Promise<void> {
    const membersPromise = input.data.map(async (createMemberWithRolesInput) =>
      this.prismaService.member.create({
        data: {
          id: createMemberWithRolesInput.id,
          groupId: createMemberWithRolesInput.groupId,
          userId: createMemberWithRolesInput.userId,
          roles: {
            connect: createMemberWithRolesInput.roleIds.map((roleId) => ({
              id: roleId,
            })),
          },
        },
      }),
    );
    await Promise.all(membersPromise);
  }

  async save(member: MemberEntity): Promise<void> {
    await this.prismaService.member.update({
      where: {
        id: member.id,
        userId: member.userId,
      },
      data: _.pick(member, 'groupId'),
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

  async connectRoles(id: string, roleIds: string[], roleNames: string[]): Promise<void> {
    await this.prismaService.member.update({
      where: {
        id,
      },
      data: {
        roles: {
          connect:
            roleIds.length > 0
              ? roleIds.map((roleId) => ({
                  id: roleId,
                }))
              : roleNames.map((roleName) => ({
                  name: roleName,
                })),
        },
      },
    });
  }

  async disconnectRoles(id: string, roleIds: string[], roleNames: string[]): Promise<void> {
    await this.prismaService.member.update({
      where: {
        id,
      },
      data: {
        roles: {
          disconnect:
            roleIds.length > 0
              ? roleIds.map((roleId) => ({
                  id: roleId,
                }))
              : roleNames.map((roleName) => ({
                  name: roleName,
                })),
        },
      },
    });
  }
}
