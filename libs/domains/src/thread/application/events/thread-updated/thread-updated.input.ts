export class ThreadUpdatedInput {
  threadId: string;

  postId: string;

  constructor({ threadId, postId }: { threadId: string; postId: string }) {
    this.threadId = threadId;
    this.postId = postId;
  }
}
