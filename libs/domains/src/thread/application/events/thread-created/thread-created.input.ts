export class ThreadCreatedInput {
  threadId: string;

  postId: string;

  tagNames: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  constructor({
    threadId,
    postId,
    tagNames,
    username,
    userAvatarURL,
    title,
    slug,
  }: {
    threadId: string;
    postId: string;
    tagNames: string[];
    username: string;
    userAvatarURL?: string;
    title: string;
    slug?: string;
  }) {
    this.threadId = threadId;
    this.postId = postId;
    this.tagNames = tagNames;
    this.username = username;
    this.userAvatarURL = userAvatarURL;
    this.title = title;
    this.slug = slug;
  }
}
