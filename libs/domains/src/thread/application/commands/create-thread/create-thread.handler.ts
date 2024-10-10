import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { ThreadEntity } from '@lib/domains/thread/domain/thread.entity';
import { ThreadErrorMessage } from '@lib/domains/thread/domain/thread.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { CreateThreadCommand } from './create-thread.command';
import { ThreadLoadPort } from '../../ports/out/thread.load.port';
import { ThreadSavePort } from '../../ports/out/thread.save.port';
import { ThreadResponse } from '../../dtos/thread.response';

@CommandHandler(CreateThreadCommand)
export class CreateThreadHandler extends PrismaCommandHandler<CreateThreadCommand, ThreadResponse> {
  constructor(
    @Inject('ThreadLoadPort') private loadPort: ThreadLoadPort,
    @Inject('ThreadSavePort') private savePort: ThreadSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(ThreadResponse);
  }

  async execute(command: CreateThreadCommand): Promise<void> {
    const brand =
      command.post.brandId &&
      (await this.prismaService.brand.findUnique({
        where: {
          id: command.post.brandId,
        },
      }));

    let { categoryId } = command.post;
    if (!categoryId) {
      const category = await this.prismaService.category.findFirst({
        where: {
          name: '일반',
        },
      });
      categoryId = category?.id;
    }

    await this.savePort.create(
      new ThreadEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          categoryId,
          userId: command.user.id,
          userAgent: command.userAgent,
          ipAddress: command.ipAddress,
          brands: brand ? [new BrandEntity(brand)] : [],
        }),
      }),
    );
    let thread = await this.loadPort.findById(command.id);
    if (!thread) throw new InternalServerErrorException(ThreadErrorMessage.THREAD_CREATION_FAILED);

    thread = this.publisher.mergeObjectContext(thread);
    thread.create({
      tagNames: command.post.tagNames || [],
    });
    thread.commit();
  }
}
