import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, concatMap, of } from 'rxjs';
import { ConnectOrCreateTagsCommand } from '@lib/domains/post/application/commands/connect-or-create-tags/connect-or-create-tags.command';
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
          new ConnectOrCreateTagsCommand({
            postId: event.postId,
            type: ARTICLE,
            tagNames: event.tagNames,
          }),
        ),
      ),
    );
}
