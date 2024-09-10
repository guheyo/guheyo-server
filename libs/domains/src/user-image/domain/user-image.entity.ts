import { parseNameFromURL } from '@lib/shared/file/parse-name-from-url';

export class UserImageEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  url: string;

  contentType: string | null;

  description: string | null;

  size: number | null;

  height: number | null;

  width: number | null;

  position: number;

  type: string;

  refId: string;

  tracked: boolean;

  userId: string;

  constructor(partial: Partial<UserImageEntity>) {
    if (partial) {
      Object.assign(this, partial);
      this.name = parseNameFromURL(this.url);
      this.tracked = false;
    }
  }

  updatePosition(position: number) {
    this.position = position;
  }

  trackImage() {
    this.tracked = true;
  }

  untrackImage() {
    this.tracked = false;
  }
}
