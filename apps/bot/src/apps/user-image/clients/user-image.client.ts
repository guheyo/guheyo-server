import { ImageService } from '@lib/shared';
import { Inject, Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
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
        const { url } = await this.imageService.uploadFileFromURL(
          uploadUserImageInput.url,
          type,
          uploadUserImageInput.userId,
        );
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
