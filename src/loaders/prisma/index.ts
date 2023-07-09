import { PrismaClient } from '@prisma/client'
import _ from 'lodash';
import softDelete from './middlewares/softDelete';

const prisma = new PrismaClient()
prisma.$use(softDelete);

export default prisma;