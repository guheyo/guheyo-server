export class ArticleCreatedInput {
  articleId: string;

  postId: string;

  tagIds: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  constructor({
    articleId,
    postId,
    tagIds,
    username,
    userAvatarURL,
    title,
    slug,
  }: {
    articleId: string;
    postId: string;
    tagIds: string[];
    username: string;
    userAvatarURL?: string;
    title: string;
    slug?: string;
  }) {
    this.articleId = articleId;
    this.postId = postId;
    this.tagIds = tagIds;
    this.username = username;
    this.userAvatarURL = userAvatarURL;
    this.title = title;
    this.slug = slug;
  }
}
