import { CommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { PostLoadPort } from '../../ports/out/post.load.port';
import { PostSavePort } from '../../ports/out/post.save.port';
import { ConnectOrCreateTagsCommand } from './connect-or-create-tags.command';

@CommandHandler(ConnectOrCreateTagsCommand)
export class ConnectOrCreateTagsHandler extends PrismaCommandHandler<
  ConnectOrCreateTagsCommand,
  TagResponse
> {
  constructor(
    @Inject('PostLoadPort') private loadPort: PostLoadPort,
    @Inject('PostSavePort') private savePort: PostSavePort,
  ) {
    super(TagResponse);
  }

  async execute(command: ConnectOrCreateTagsCommand) {
    const post = await this.loadPort.findById(command.postId);
    if (!post) throw new NotFoundException(PostErrorMessage.POST_NOT_FOUND);

    const tags = await Promise.all(
      command.tagNames.map(async (tagName) => {
        let tag = await this.prismaService.tag.findFirst({
          where: {
            name: tagName,
          },
        });
        if (!tag) {
          tag = await this.prismaService.tag.create({
            data: {
              type: command.type,
              name: tagName,
              position: 9999,
            },
          });
        }
        return tag;
      }),
    );

    const tagIds = tags.map((tag) => tag.id);
    this.savePort.connectTags(command.postId, tagIds);
  }
}
