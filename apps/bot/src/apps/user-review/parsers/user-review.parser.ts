import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { CreateUserReviewInput } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.input';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import {
  USER_REVIEW,
  USER_REVIEW_ONE_WAY,
} from '@lib/domains/user-review/domain/user-review.constants';
import { OFFER } from '@lib/domains/offer/domain/offer.constants';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { Injectable } from '@nestjs/common';
import { DISCORD } from '@lib/shared/discord/discord.constants';

@Injectable()
export class UserReviewParser extends GroupParser {
  parseCreateUserReviewInput(
    reviewedUserId: string,
    threadPost: ThreadPost,
    group: GroupResponse,
    tags: TagResponse[],
  ): CreateUserReviewInput {
    const post = {
      id: this.parseIdFromChannelId(threadPost.threadChannel.id),
      createdAt: threadPost.starterMessage.createdAt,
      updatedAt: threadPost.starterMessage.editedAt || threadPost.starterMessage.createdAt,
      type: USER_REVIEW,
      title: threadPost.threadChannel.name,
      groupId: group.id,
      tagIds: this.parseTagIds(threadPost.tagNames, tags),
      userAgent: DISCORD,
    };

    return {
      id: this.parseIdFromMessageId(threadPost.starterMessage.id),
      type: OFFER,
      reviewedUserId,
      rating: this.parseRating(threadPost.tagNames),
      status: USER_REVIEW_ONE_WAY,
      post,
      content: threadPost.starterMessage.content,
    };
  }

  parseRating(tagNames: string[]) {
    return tagNames.some((tagName) => tagName === '비매너') ? 1 : 2;
  }
}
