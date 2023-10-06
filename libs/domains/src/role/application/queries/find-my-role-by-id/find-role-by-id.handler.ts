import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindRoleByIdQuery } from './find-role-by-id.query';
import { RoleResponse } from '../../dtos/role.response';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHandler extends PrismaQueryHandler<FindRoleByIdQuery, RoleResponse> {
  constructor() {
    super(RoleResponse);
  }

  async execute(query: FindRoleByIdQuery): Promise<RoleResponse | null> {
    const role = await this.prismaService.role.findUnique({
      where: { id: query.id },
    });
    return this.parseResponse(role);
  }
}
