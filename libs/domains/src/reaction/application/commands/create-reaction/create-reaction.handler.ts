import { CommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { ReactionEntity } from '@lib/domains/reaction/domain/reaction.entity';
import { GraphqlPubSub } from '@lib/shared/pubsub/graphql-pub-sub';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateReactionCommand } from './create-reaction.command';
import { ReactionSavePort } from '../../ports/out/reaction.save.port';
import { ReactionLoadPort } from '../../ports/out/reaction.load.port';
import { ReactionResponse } from '../../dtos/reaction.response';
import { parseReactionCreatedTriggerName } from '../../subscriptions/reaction-created/parse-reaction-created-trigger-name';

@CommandHandler(CreateReactionCommand)
export class CreateReactionHandler extends PrismaCommandHandler<
  CreateReactionCommand,
  ReactionResponse
> {
  constructor(
    @Inject('ReactionLoadPort') private loadPort: ReactionLoadPort,
    @Inject('ReactionSavePort') private savePort: ReactionSavePort,
  ) {
    super(ReactionResponse);
  }

  async execute(command: CreateReactionCommand): Promise<void> {
    const existingReaction = await this.loadPort.findReaction({
      ...command,
      userId: command.user.id,
    });

    if (existingReaction) {
      existingReaction.readd();
      await this.savePort.save(existingReaction);
    } else {
      const reaction = new ReactionEntity({
        ...command,
        userId: command.user.id,
      });
      await this.savePort.create(reaction);
    }

    const newReaction = await this.prismaService.reaction.findUnique({
      where: {
        id: existingReaction?.id || command.id,
      },
      include: {
        emoji: true,
      },
    });
    await GraphqlPubSub.publish(
      parseReactionCreatedTriggerName({
        postId: newReaction?.postId || undefined,
        commentId: newReaction?.commentId || undefined,
      }),
      { reactionCreated: newReaction },
    );
  }
}
