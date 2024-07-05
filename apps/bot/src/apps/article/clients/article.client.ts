import { Injectable, Logger } from '@nestjs/common';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { CreateArticleInput } from '@lib/domains/article/application/commands/create-article/create-article.input';
import { CreateArticleCommand } from '@lib/domains/article/application/commands/create-article/create-article.command';
import { ARTICLE } from '@lib/domains/article/domain/article.constants';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { ArticleParser } from '../parsers/article.parser';

@Injectable()
export class ArticleClient extends UserImageClient {
  constructor(protected readonly articleParser: ArticleParser) {
    super();
  }

  private readonly logger = new Logger(ArticleClient.name);

  async createArticle({ input, user }: { input: CreateArticleInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateArticleCommand({ input, user }));
  }

  async createArticleFromPost(user: MyUserResponse, threadPost: ThreadPost, group: GroupResponse) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      threadPost.starterMessage,
      ARTICLE,
    );
    const createArticleInput = this.articleParser.parseCreateArticleInput(threadPost, group);

    await this.uploadAndCreateAttachments(user, uploadUserImageInputList, ARTICLE);
    await this.createArticle({ input: createArticleInput, user });
    this.logger.log(`article<@${createArticleInput.id}> created`);
  }
}
