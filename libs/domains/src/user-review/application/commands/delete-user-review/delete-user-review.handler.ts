import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { UserReviewErrorMessage } from '@lib/domains/user-review/domain/user-review.error.message';
import { UserReviewLoadPort } from '../../ports/out/user-review.load.port';
import { UserReviewSavePort } from '../../ports/out/user-review.save.port';
import { DeleteUserReviewCommand } from './delete-user-review.command';

@CommandHandler(DeleteUserReviewCommand)
export class DeleteUserReviewHandler implements ICommandHandler<DeleteUserReviewCommand> {
  constructor(
    @Inject('UserReviewLoadPort') private loadPort: UserReviewLoadPort,
    @Inject('UserReviewSavePort') private savePort: UserReviewSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteUserReviewCommand): Promise<void> {
    const review = await this.loadPort.findById(command.id);
    if (!review) throw new NotFoundException(UserReviewErrorMessage.USER_REVIEW_NOT_FOUND);
    if (!review.isAuthorized(command.user.id))
      throw new ForbiddenException(
        UserReviewErrorMessage.USER_REVIEW_DELETE_COMMAND_FROM_UNAUTHORIZED_USER,
      );
    await this.savePort.delete(review);
  }
}
