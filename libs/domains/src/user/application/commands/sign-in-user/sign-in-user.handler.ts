import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { ImageService } from '@lib/shared';
import { v4 as uuid4 } from 'uuid';
import { SignInUserCommand } from './sign-in-user.command';
import { UserSavePort } from '../../ports/out/user.save.port';
import { UserLoadPort } from '../../ports/out/user.load.port';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    @Inject('UserLoadPort')
    private readonly userLoadPort: UserLoadPort,
    @Inject('UserSavePort')
    private readonly userSavePort: UserSavePort,
    private readonly imageService: ImageService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SignInUserCommand): Promise<void> {
    const user = await this.userLoadPort.findBySocialAccount(command.provider, command.socialId);
    if (user) return;

    const newUser = this.publisher.mergeObjectContext(
      new UserEntity({
        id: command.id,
        username: command.username,
        name: command.name,
        phoneNumber: command.phoneNumber,
        avatarURL: command.avatarURL,
      }),
    );

    if (command.avatarURL) {
      const url = await this.imageService.uploadFileFromURL(
        command.avatarURL,
        'avatar',
        newUser.id,
      );
      newUser.avatarURL = url;
      newUser.createAvatar({
        url,
        name: this.imageService.parseNameFromURL(url),
        contentType: this.imageService.parseMimeType(url),
        source: command.provider,
      });
    }

    await this.userSavePort.create(newUser);
    newUser.linkSocialAccount({
      socialAccountId: uuid4(),
      provider: command.provider,
      socialId: command.socialId,
      accessToken: command.accessToken,
      refreshToken: command.refreshToken,
    });
    newUser.commit();
  }
}
