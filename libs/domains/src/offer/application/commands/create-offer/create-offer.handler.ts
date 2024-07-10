import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, InternalServerErrorException } from '@nestjs/common';
import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { OfferErrorMessage } from '@lib/domains/offer/domain/offer.error.message';
import {
  DAILY_OFFER_POSTING_LIMIT,
  DAY_HOURS,
  OFFER,
} from '@lib/domains/offer/domain/offer.constants';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { CreateOfferCommand } from './create-offer.command';
import { OfferSavePort } from '../../ports/out/offer.save.port';
import { OfferResponse } from '../../dtos/offer.response';
import { OfferLoadPort } from '../../ports/out/offer.load.port';

@CommandHandler(CreateOfferCommand)
export class CreateOfferHandler extends PrismaCommandHandler<CreateOfferCommand, OfferResponse> {
  constructor(
    @Inject('OfferSavePort') private savePort: OfferSavePort,
    @Inject('OfferLoadPort') private loadPort: OfferLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(OfferResponse);
  }

  async execute(command: CreateOfferCommand): Promise<void> {
    const countDailyOfferPostingInSameCategory = await this.prismaService.offer.countOffer({
      userId: command.user.id,
      categoryId: command.post.categoryId!,
      businessFunction: command.businessFunction,
      fromHours: DAY_HOURS,
    });
    if (countDailyOfferPostingInSameCategory > DAILY_OFFER_POSTING_LIMIT)
      throw new ForbiddenException(OfferErrorMessage.DAILY_OFFER_POSTING_LIMIT_EXCEEDED);

    const image = await this.prismaService.userImage.findFirst({
      where: {
        type: OFFER,
        refId: command.id,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    await this.savePort.create(
      new OfferEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
          thumbnail: image?.url,
          userAgent: command.userAgent,
          ipAddress: command.ipAddress,
        }),
      }),
    );
    let offer = await this.loadPort.findById(command.id);
    if (!offer) throw new InternalServerErrorException(OfferErrorMessage.OFFER_CREATION_FAILED);

    offer = this.publisher.mergeObjectContext(offer);
    offer.create(command.post.tagIds || []);
    offer.commit();
  }
}
