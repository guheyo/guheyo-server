import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from '@app/api/exceptions/api.exception';
import { IUserRepository, IUserService } from '@app/api/interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async findOne(id: number): Promise<number> {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      throw new ApiException().userNotFound();
    }
    return data;
  }
}
