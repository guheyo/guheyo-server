export class ArticleCreatedInput {
  articleId: string;

  postId: string;

  tagNames: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  constructor({
    articleId,
    postId,
    tagNames,
    username,
    userAvatarURL,
    title,
    slug,
  }: {
    articleId: string;
    postId: string;
    tagNames: string[];
    username: string;
    userAvatarURL?: string;
    title: string;
    slug?: string;
  }) {
    this.articleId = articleId;
    this.postId = postId;
    this.tagNames = tagNames;
    this.username = username;
    this.userAvatarURL = userAvatarURL;
    this.title = title;
    this.slug = slug;
  }
}
