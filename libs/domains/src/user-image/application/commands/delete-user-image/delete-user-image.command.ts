import { ICommand } from '@nestjs/cqrs';

export class DeleteUserImageCommand implements ICommand {
  id: string;

  userId: string;

  constructor({ id, userId }: { id: string; userId: string }) {
    this.id = id;
    this.userId = userId;
  }
}
