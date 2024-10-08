import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { FollowUserCommand } from './follow-user.command';
import { UserSavePort } from '../../ports/out/user.save.port';
import { UserResponse } from '../../dtos/user.response';

@CommandHandler(FollowUserCommand)
export class FollowUserHandler extends PrismaCommandHandler<FollowUserCommand, UserResponse> {
  constructor(
    @Inject('UserSavePort') private userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(UserResponse);
  }

  async execute(command: FollowUserCommand): Promise<void> {
    const alreadyFollowing = await this.prismaService.followUser.findFirst({
      where: {
        followingId: command.followingId,
        followerId: command.user.id,
      },
    });

    if (alreadyFollowing) {
      throw new InternalServerErrorException(UserErrorMessage.USER_ALREADY_FOLLOWED);
    }

    await this.prismaService.followUser.create({
      data: {
        followingId: command.followingId,
        followerId: command.user.id,
      },
    });
  }
}
