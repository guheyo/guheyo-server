import { Inject, Injectable } from '@nestjs/common';
import { ApisException } from '~api/src/exceptions/api.exception';
import { IUserRepository, IUserService } from '~api/src/interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async findOne(id: number): Promise<number> {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      throw new ApisException().userNotFound();
    }
    return data;
  }
}
