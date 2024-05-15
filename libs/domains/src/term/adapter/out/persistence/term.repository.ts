import { TermEntity } from '@lib/domains/term/application/domain/term.entity';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class TermRepository extends PrismaRepository<TermEntity> {
  constructor() {
    super(TermEntity);
  }

  async findById(id: string): Promise<TermEntity | null> {
    const term = await this.prismaService.term.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(term);
  }

  async create(term: TermEntity): Promise<void> {
    await this.prismaService.term.create({
      data: _.pick(term, ['id', 'name', 'title', 'content', 'meta']),
    });
  }

  async createMany(terms: TermEntity[]): Promise<void> {
    await Promise.all(terms.map((term) => this.create(term)));
  }

  async save(term: TermEntity): Promise<void> {
    await this.prismaService.term.update({
      where: {
        id: term.id,
      },
      data: _.pick(term, ['name', 'title', 'content', 'meta']),
    });
  }

  async delete(term: TermEntity): Promise<void> {
    await this.prismaService.term.delete({
      where: {
        id: term.id,
      },
    });
  }
}
