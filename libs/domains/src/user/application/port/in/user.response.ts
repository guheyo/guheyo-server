import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '@lib/domains/user/domain/user.entity';

export class UserResponse extends OmitType(UserEntity, ['updatedAt', 'deletedAt'] as const) {}
