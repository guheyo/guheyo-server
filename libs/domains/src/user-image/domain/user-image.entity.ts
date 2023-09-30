export class UserImageEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  url: string;

  height: number;

  width: number;

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
}
