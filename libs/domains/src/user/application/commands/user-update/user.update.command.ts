import { PartialType, PickType } from '@nestjs/swagger';
import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class UserUpdateCommand
  extends PartialType(PickType(UserEntity, ['name', 'avatarURL'] as const))
  implements ICommand {}
