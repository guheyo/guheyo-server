import { UserRepository } from '~apis/src/repositories/user.repository';
import { UserService } from '~apis/src/services/user.service';

export * from './repositories/user-repository.interface';
export * from './services/user-service.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Interfaces = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },

  {
    provide: 'IUserService',
    useClass: UserService,
  },
];
