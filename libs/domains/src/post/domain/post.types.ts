export interface UpdatePostProps {
  id: string;

  archivedAt?: Date;

  pending?: string;

  title?: string;

  content?: string;

  thumbnail?: string;

  categoryId?: string;
}
