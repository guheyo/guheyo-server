import { UserRepository } from '@app/api/repositories/user.repository';
import { UserService } from '@app/api/services/user.service';

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
