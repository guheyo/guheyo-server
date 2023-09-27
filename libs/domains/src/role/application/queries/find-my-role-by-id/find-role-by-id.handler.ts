import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@lib/shared';
import { FindRoleByIdQuery } from './find-role-by-id.query';
import { RoleResponse } from '../../dtos/role.response';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHandler implements IQueryHandler<FindRoleByIdQuery> {
  constructor(private prismaService: PrismaService) {}

  async execute(query: FindRoleByIdQuery): Promise<RoleResponse | null> {
    const user = await this.prismaService.role.findUnique({
      where: { id: query.id },
    });
    return user ? new RoleResponse(user) : null;
  }
}
