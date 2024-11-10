import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { ReviewEntity } from '@lib/domains/review/domain/review.entity';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { REVIEW } from '@lib/domains/review/domain/review.constants';
import { CreateReviewCommand } from './create-review.command';
import { ReviewDetailResponse } from '../../dtos/review-detail.response';
import { ReviewSavePort } from '../../ports/out/review.save.port';
import { ReviewLoadPort } from '../../ports/out/review.load.port';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler extends PrismaCommandHandler<
  CreateReviewCommand,
  ReviewDetailResponse
> {
  constructor(
    @Inject('ReviewSavePort') private savePort: ReviewSavePort,
    @Inject('ReviewLoadPort') private loadPort: ReviewLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(ReviewDetailResponse);
  }

  async execute(command: CreateReviewCommand): Promise<void> {
    const image = await this.prismaService.userImage.findFirst({
      where: {
        type: REVIEW,
        refId: command.id,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const product = new ReviewEntity({
      ...command,
      post: new PostEntity({
        ...command.post,
        userId: command.user.id,
        thumbnail: image?.url,
        userAgent: command.userAgent,
        ipAddress: command.ipAddress,
      }),
    });
    await this.savePort.create(product);
  }
}
