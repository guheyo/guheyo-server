export class UserImageEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  url: string;

  contentType: string | null;

  description: string | null;

  height: number | null;

  width: number | null;

  position: number;

  type: string;

  refId: string;

  tracked: boolean;

  userId: string;

  constructor(partial: Partial<UserImageEntity>) {
    Object.assign(this, partial);
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
