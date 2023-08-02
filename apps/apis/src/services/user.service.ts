import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApisException } from '~apis/src/exceptions/apis.exception';
import { IUserRepository, IUserService } from '~apis/src/interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      include: {
        roles: {
          orderBy: {
            rank: 'asc',
          },
        },
        socialAccounts: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    if (!user) {
      throw new ApisException().userNotFound();
    }
    return user;
  }
}
