import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class UserUpdateRequest extends PickType(UserEntity, ['name', 'avatarURL'] as const) {}
