import { ImageService } from '@lib/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateUserImageCommand } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.command';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { CreateManyUserImageCommand } from '@lib/domains/user-image/application/commands/create-many-user-image/create-many-user-image.command';
import { UserImageParser } from '../parsers/user-image.parser';

@Injectable()
export class UserImageClient {
  @Inject()
  protected readonly userImageParser: UserImageParser;

  @Inject()
  protected readonly imageService: ImageService;

  @Inject()
  protected readonly queryBus: QueryBus;

  @Inject()
  protected readonly commandBus: CommandBus;

  async uploadAndCreateAvatar({
    userId,
    discordAvatarURL,
  }: {
    userId: string;
    discordAvatarURL?: string;
  }): Promise<string | null> {
    if (!discordAvatarURL) return null;

    const imageId = this.userImageParser.generateUUID();
    const { url, contentType, name } = await this.uploadAvatar({
      userId,
      imageId,
      discordAvatarURL,
    });
    await this.createAvatar({
      id: imageId,
      name,
      url,
      contentType: contentType || undefined,
      userId,
    });
    return url;
  }

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

  async createAvatar({
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
  }): Promise<string> {
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

  async uploadAndCreateAttachments(
    uploadUserImageInputList: CreateUserImageInput[],
    type: string,
  ): Promise<void> {
    const createUserImageInputList = await this.uploadAttachments(uploadUserImageInputList, type);
    await this.createAttachments(createUserImageInputList);
  }

  async uploadAttachments(
    uploadUserImageInputList: CreateUserImageInput[],
    type: string,
  ): Promise<CreateUserImageInput[]> {
    const createUserImageInputPromiseList = uploadUserImageInputList.map(
      async (uploadUserImageInput) => {
        const path = this.imageService.generateUploadPath(
          uploadUserImageInput.userId,
          type,
          uploadUserImageInput.id,
        );
        const { url } = await this.imageService.uploadFileFromURL(uploadUserImageInput.url, path);
        uploadUserImageInput.url = url;
        return uploadUserImageInput;
      },
    );
    return Promise.all(createUserImageInputPromiseList);
  }

  async createAttachments(createUserImageInputList: CreateUserImageInput[]): Promise<void> {
    await this.commandBus.execute(
      new CreateManyUserImageCommand({
        data: createUserImageInputList,
      }),
    );
  }
}
