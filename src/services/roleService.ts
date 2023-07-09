import { prisma } from '../loaders';
import _ from 'lodash';

export interface RoleData {
  id: string,
  createdAt: Date,
  name: string,
  hexColor: string,
  rank: number
};

const roleService = {
  async getAllRoles() {
    return await prisma.role.findMany({
      orderBy: {
        rank: 'asc'
      }
    });
  },
  async saveRoles(roles: RoleData[]) {
    return prisma.role.createMany({
      data: roles,
      skipDuplicates: true
    });
  },
  async upsertRoles(roles: RoleData[]) {
    const rolePromises = roles.map((role) => {
      return prisma.role.upsert({
        where: {
          id: role.id
        },
        update: {
          name: role.name,
          hexColor: role.hexColor,
          rank: role.rank
        },
        create: {
          id: role.id,
          name: role.name,
          hexColor: role.hexColor,
          rank: role.rank
        }
      });
    });
    return Promise.all(rolePromises);
  }
}

export default roleService;