import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { ImageService } from '@lib/shared';
import { v4 as uuid4 } from 'uuid';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { LinkSocialProfileCommand } from './link-social-profile.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';
import { MyUserResponse } from '../../dtos/my-user.response';

@CommandHandler(LinkSocialProfileCommand)
export class LinkSocialProfileHandler extends PrismaCommandHandler<
  LinkSocialProfileCommand,
  MyUserResponse
> {
  constructor(
    @Inject('UserLoadPort') private userLoadPort: UserLoadPort,
    @Inject('UserSavePort') private userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
    private readonly imageService: ImageService,
  ) {
    super(MyUserResponse);
  }

  async execute(command: LinkSocialProfileCommand): Promise<void> {
    let user = await this.userLoadPort.findById(command.userId);
    if (!user) throw new NotFoundException(UserErrorMessage.USER_IS_NOT_FOUND);

    user = this.publisher.mergeObjectContext(user);
    if (command.avatarURL) {
      const newAvatarName = this.imageService.parseNameFromURL(command.avatarURL);
      const oldAvatarName = this.imageService.parseNameFromURL(user.avatarURL || '');

      if (newAvatarName !== oldAvatarName) {
        const url = await this.imageService.uploadFileFromURL({
          url: command.avatarURL,
          type: 'avatar',
          userId: user.id,
        });
        user.avatarURL = url;
        user.createAvatar({
          imageId: uuid4(),
          url,
          name: newAvatarName,
          contentType: this.imageService.parseMimeType(url),
          source: command.provider,
        });
      }
    }

    user.update(_.pick(command, ['username']));
    await this.userSavePort.save(user);
    user.commit();
  }
}
