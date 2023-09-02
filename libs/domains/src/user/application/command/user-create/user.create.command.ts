import { PickType } from '@nestjs/swagger';
import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class UserCreateCommand
  extends PickType(UserEntity, ['username'] as const)
  implements ICommand {}
