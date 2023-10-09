import { ImageService } from '@lib/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateUserImageCommand } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.command';
import { UserImageParser } from './user-image.parser';

@Injectable()
export class UserImageClient {
  @Inject()
  protected readonly userImageParser: UserImageParser;

  @Inject()
  protected readonly imageService: ImageService;

  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
  ) {}

  async uploadAvatar({
    userId,
    imageId,
    discordAvatarURL,
  }: {
    userId: string;
    imageId: string;
    discordAvatarURL: string;
  }) {
    const path = this.imageService.generateUploadPath(userId, 'user-avatar', imageId);
    return this.imageService.uploadFileFromURL(discordAvatarURL, path);
  }

  async createAvatarImage({
    id,
    name,
    url,
    contentType,
    userId,
  }: {
    id: string;
    name: string;
    url: string;
    contentType?: string;
    userId: string;
  }): Promise<string | null> {
    const input = this.userImageParser.parseCreateUserImageFromAvatar({
      id,
      name,
      url,
      contentType,
      userId,
    });
    await this.commandBus.execute(new CreateUserImageCommand(input));
    return id;
  }
}
