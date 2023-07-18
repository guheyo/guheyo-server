import { PrismaClient } from '@prisma/client';
import softDelete from './middlewares/soft-delete';

const prisma = new PrismaClient();
prisma.$use(softDelete);

export default prisma;
