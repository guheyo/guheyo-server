import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { ArticleEntity } from '@lib/domains/article/domain/article.entity';
import { ArticleErrorMessage } from '@lib/domains/article/domain/article.error.message';
import { CreateArticleCommand } from './create-article.command';
import { ArticleLoadPort } from '../../ports/out/article.load.port';
import { ArticleSavePort } from '../../ports/out/article.save.port';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @Inject('ArticleLoadPort') private loadPort: ArticleLoadPort,
    @Inject('ArticleSavePort') private savePort: ArticleSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateArticleCommand): Promise<void> {
    await this.savePort.create(
      new ArticleEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
        }),
      }),
    );
    let article = await this.loadPort.findById(command.id);
    if (!article)
      throw new InternalServerErrorException(ArticleErrorMessage.ARTICLE_CREATION_FAILED);

    article = this.publisher.mergeObjectContext(article);
    article.create(command.post.tagNames || []);
    article.commit();
  }
}
