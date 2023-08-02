import { Inject, Injectable } from '@nestjs/common';
import { SocialAccount, User } from '@prisma/client';
import { ApisException } from '~apis/src/exceptions/apis.exception';
import { IUserRepository, IUserService } from '~apis/src/interfaces';
import { ISocialAccountRepository } from '~apis/src/interfaces/repositories/social-account.repository.interface';
import { GetUserBySocialAccountDto } from '~apis/src/dto/get-user-by-social-account.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ISocialAccountRepository')
    private readonly socialAccountRepository: ISocialAccountRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findUnique({
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
    console.log(user);
    if (!user) {
      throw new ApisException().userNotFound();
    }
    return user;
  }

  async getUserBySocialAccount(query: GetUserBySocialAccountDto): Promise<SocialAccount> {
    const { provider, socialId } = query;
    const user = await this.socialAccountRepository.findFirst({
      where: {
        provider,
        socialId,
      },
      include: {
        user: {
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
        },
      },
    });

    return user;
  }

  async createUser(body: User): Promise<User> {
    const user = await this.userRepository.create({
      data: {
        ...body,
      },
    });

    return user;
  }

  async updateUser(id: string, body: User): Promise<User> {
    const user = await this.userRepository.update({
      where: {
        id,
      },
      data: { ...body },
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

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.delete({
      where: {
        id,
      },
    });

    return user;
  }
}
