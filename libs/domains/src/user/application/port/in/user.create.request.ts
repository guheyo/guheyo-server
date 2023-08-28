import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class UserCreateRequest extends PickType(UserEntity, ['username'] as const) {}
