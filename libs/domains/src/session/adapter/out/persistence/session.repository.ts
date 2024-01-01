import { SessionLoadPort } from '@lib/domains/session/application/port/out/session.load.port';
import { SessionEntity } from '@lib/domains/session/domain/session.entity';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionRepository extends PrismaRepository<SessionEntity> implements SessionLoadPort {
  constructor() {
    super(SessionEntity);
  }

  async findById(id: string): Promise<SessionEntity | null> {
    const session = await this.prismaService.session.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(session);
  }

  async findBySessionToken(sessionToken: string): Promise<SessionEntity | null> {
    const session = await this.prismaService.session.findUnique({
      where: {
        sessionToken,
      }
    });
    return this.toEntity(session);
  }

  async create(entity: SessionEntity): Promise<void> {
    await this.prismaService.session.create({
      data: entity,
    });
  }

  async createMany(entities: SessionEntity[]): Promise<void> {
    await this.prismaService.session.createMany({
      data: entities,
    });
  }

  async save(entity: SessionEntity): Promise<void> {
    await this.prismaService.session.updateMany({
      where: {
        sessionToken: entity.sessionToken,
      },
      data: entity,
    });
  }

  async delete(entity: SessionEntity): Promise<void> {
    await this.prismaService.session.delete({
      where: {
        sessionToken: entity.sessionToken,
      },
    });
  }
}
