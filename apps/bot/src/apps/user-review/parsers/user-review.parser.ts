import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { CreateUserReviewInput } from '@lib/domains/user-review/application/commands/create-user-review/create-user-review.input';
import { PostMessage } from '@app/bot/shared/interfaces/post-message.interfaces';
import {
  USER_REVIEW,
  USER_REVIEW_ONE_WAY,
} from '@lib/domains/user-review/domain/user-review.constants';
import { OFFER } from '@lib/domains/offer/domain/offer.constants';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserReviewParser extends GroupParser {
  parseCreateUserReviewInput(
    reviewedUserId: string,
    postMessage: PostMessage,
    group: GroupResponse,
    tags: TagResponse[],
  ): CreateUserReviewInput {
    const post = {
      createdAt: postMessage.message.createdAt,
      updatedAt: postMessage.message.editedAt || postMessage.message.createdAt,
      type: USER_REVIEW,
      title: postMessage.title,
      groupId: group.id,
      tagIds: this.parseTagIds(postMessage.tagNames, tags),
    };

    return {
      type: OFFER,
      reviewedUserId,
      rating: this.parseRating(postMessage.tagNames),
      status: USER_REVIEW_ONE_WAY,
      post,
      id: this.parseIdFromMessage(postMessage.message),
      content: postMessage.message.content,
    };
  }

  parseRating(tagNames: string[]) {
    return tagNames.some((tagName) => tagName === '비매너') ? 1 : 2;
  }
}
