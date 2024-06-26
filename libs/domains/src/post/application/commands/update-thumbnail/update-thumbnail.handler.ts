import { CommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { PostLoadPort } from '../../ports/out/post.load.port';
import { PostSavePort } from '../../ports/out/post.save.port';
import { UpdateThumbnailCommand } from './update-thumbnail.command';
import { PostResponse } from '../../dtos/post.response';

@CommandHandler(UpdateThumbnailCommand)
export class UpdateThumbnailHandler extends PrismaCommandHandler<
  UpdateThumbnailCommand,
  PostResponse
> {
  constructor(
    @Inject('PostLoadPort') private loadPort: PostLoadPort,
    @Inject('PostSavePort') private savePort: PostSavePort,
  ) {
    super(PostResponse);
  }

  async execute(event: UpdateThumbnailCommand) {
    const post = await this.loadPort.findById(event.postId);
    if (!post) throw new NotFoundException(PostErrorMessage.POST_NOT_FOUND);

    const image = await this.prismaService.userImage.findFirst({
      where: {
        type: event.type,
        refId: event.refId,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    if (image?.url && post.isUpdatedThumbnail(image.url)) {
      post.updateThumbnail(image.url);
      this.savePort.save(post);
    }
  }
}
