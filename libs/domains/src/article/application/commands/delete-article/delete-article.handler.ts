import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ArticleErrorMessage } from '@lib/domains/article/domain/article.error.message';
import { ArticleLoadPort } from '../../ports/out/article.load.port';
import { ArticleSavePort } from '../../ports/out/article.save.port';
import { DeleteArticleCommand } from './delete-article.command';

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler implements ICommandHandler<DeleteArticleCommand> {
  constructor(
    @Inject('ArticleLoadPort') private loadPort: ArticleLoadPort,
    @Inject('ArticleSavePort') private savePort: ArticleSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteArticleCommand): Promise<void> {
    const article = await this.loadPort.findById(command.id);
    if (!article) throw new NotFoundException(ArticleErrorMessage.ARTICLE_NOT_FOUND);
    if (!article.isAuthorized(command.user.id))
      throw new ForbiddenException(
        ArticleErrorMessage.ARTICLE_DELETE_COMMAND_FROM_UNAUTHORIZED_USER,
      );
    await this.savePort.delete(article);
  }
}
