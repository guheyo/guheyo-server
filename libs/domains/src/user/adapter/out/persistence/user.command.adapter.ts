import { Injectable } from '@nestjs/common';
import { UserSavePort } from '@lib/domains/user/application/port/out/user.save.port';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { UserCommandRepository } from './user.command.repository';

@Injectable()
export class UserCommandAdapter implements UserSavePort {
  constructor(private repository: UserCommandRepository) {}

  async create(user: UserEntity): Promise<void> {
    await this.repository.create(user);
  }

  async update(user: UserEntity): Promise<void> {
    await this.repository.update(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
