import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { ReactionEntity } from '@lib/domains/reaction/domain/reaction.entity';
import { ReactionSavePort } from '@lib/domains/reaction/application/ports/out/reaction.save.port';
import { ReactionLoadPort } from '@lib/domains/reaction/application/ports/out/reaction.load.port';

@Injectable()
export class ReactionRepository
  extends PrismaRepository<ReactionEntity>
  implements ReactionSavePort, ReactionLoadPort
{
  constructor() {
    super(ReactionEntity);
  }

  async findById(id: string): Promise<ReactionEntity | null> {
    const reaction = await this.prismaService.reaction.findUnique({
      where: {
        id,
      },
    });
    return this.toEntity(reaction);
  }

  async findReaction({
    emojiId,
    postId,
    commentId,
    userId,
  }: {
    emojiId: string;
    postId?: string | undefined;
    commentId?: string | undefined;
    userId: string;
  }) {
    const reaction = await this.prismaService.reaction.findFirst({
      where: {
        emojiId,
        postId,
        commentId,
        userId,
      },
    });
    return this.toEntity(reaction);
  }

  async create(reaction: ReactionEntity): Promise<void> {
    await this.prismaService.reaction.create({
      data: _.pick(reaction, ['id', 'emojiId', 'userId', 'postId', 'commentId']),
    });
  }

  async createMany(reactions: ReactionEntity[]): Promise<void> {
    await reactions.map(async (reaction) => this.create(reaction));
  }

  async save(reaction: ReactionEntity): Promise<void> {
    await this.prismaService.reaction.update({
      where: {
        id: reaction.id,
      },
      data: _.pick(reaction, 'canceledAt'),
    });
  }

  async delete(reaction: ReactionEntity): Promise<void> {
    await this.prismaService.reaction.delete({
      where: {
        id: reaction.id,
      },
    });
  }
}
