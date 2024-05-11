import { Injectable, Logger } from '@nestjs/common';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateUserReviewInput } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.input';
import { CreateUserReviewCommand } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.command';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { USER_REVIEW } from '@lib/domains/user-review/domain/user-review.constants';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { UserReviewParser } from '../parsers/user-review.parser';

@Injectable()
export class UserReviewClient extends UserImageClient {
  constructor(protected readonly userReviewParser: UserReviewParser) {
    super();
  }

  public readonly logger = new Logger(UserReviewClient.name);

  async createUserReview({ input, user }: { input: CreateUserReviewInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateUserReviewCommand({ input, user }));
  }

  async createUserReviewFromPost(
    user: MyUserResponse,
    reviewedUserId: string,
    threadPost: ThreadPost,
    group: GroupResponse,
    tags: TagResponse[],
  ) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      user.id,
      threadPost.starterMessage,
      USER_REVIEW,
    );
    const createUserReviewInput = this.userReviewParser.parseCreateUserReviewInput(
      reviewedUserId,
      threadPost,
      group,
      tags,
    );

    await this.uploadAndCreateAttachments(uploadUserImageInputList, USER_REVIEW);
    await this.createUserReview({ input: createUserReviewInput, user });
    this.logger.log(`userReview<@${createUserReviewInput.id}> created`);
  }
}
