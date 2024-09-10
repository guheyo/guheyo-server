import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToInstance } from 'class-transformer';
import { FindRoleByIdQuery } from './find-role-by-id.query';
import { RoleResponse } from '../../dtos/role.response';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHandler extends PrismaQueryHandler {
  async execute(query: FindRoleByIdQuery): Promise<RoleResponse | null> {
    const role = await this.prismaService.role.findUnique({
      where: { id: query.id },
    });
    return plainToInstance(RoleResponse, role);
  }
}
