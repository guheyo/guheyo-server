import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { ConnectTagsCommand } from '@lib/domains/post/application/commands/connect-tags/connect-tags.command';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { UpdateThumbnailCommand } from '@lib/domains/post/application/commands/update-thumbnail/update-thumbnail.command';
import { ArticleCreatedEvent } from '../events/article-created/article-created.event';
import { ARTICLE } from '../../domain/article.constants';

@Injectable()
export class ArticleSagas {
  @Saga()
  created = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(ArticleCreatedEvent),
      concatMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: ARTICLE,
            refId: event.articleId,
          }),
          new UpdateThumbnailCommand({
            postId: event.postId,
            type: ARTICLE,
            refId: event.articleId,
          }),
          new ConnectTagsCommand({
            postId: event.postId,
            tagIds: event.tagIds,
          }),
        ),
      ),
    );
}
