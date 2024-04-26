export interface CreatePostProps {
  type: string;

  title: string;

  slug?: string;

  thumbnail?: string;

  groupId?: string;

  categoryId?: string;

  userId?: string;

  tagIds: string[];
}

export interface UpdatePostProps {
  archivedAt?: Date;

  pending?: string;

  title?: string;

  thumbnail?: string;

  categoryId?: string;

  tagIds: string[];
}
