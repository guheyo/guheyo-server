import { Injectable } from '@nestjs/common';
import { IUserRepository } from '~apis/src/interfaces';

@Injectable()
export class UserRepository implements IUserRepository {
  async findOne(userId: number): Promise<number> {
    return userId;
  }
}
