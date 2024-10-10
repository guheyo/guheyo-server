import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { UnfollowUserCommand } from './unfollow-user.command';
import { UserSavePort } from '../../ports/out/user.save.port';
import { UserResponse } from '../../dtos/user.response';

@CommandHandler(UnfollowUserCommand)
export class UnfollowUserHandler extends PrismaCommandHandler<UnfollowUserCommand, UserResponse> {
  constructor(
    @Inject('UserSavePort') private userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(UserResponse);
  }

  async execute(command: UnfollowUserCommand): Promise<void> {
    const alreadyFollowing = await this.prismaService.followUser.findFirst({
      where: {
        followingId: command.followingId,
        followerId: command.user.id,
      },
    });

    if (!alreadyFollowing) {
      throw new InternalServerErrorException(UserErrorMessage.USER_NOT_FOLLOWED);
    }

    await this.prismaService.$queryRaw`
      DELETE FROM public."FollowUser"
      WHERE "followingId" = ${command.followingId}
      AND "followerId" = ${command.user.id};
    `;
  }
}
