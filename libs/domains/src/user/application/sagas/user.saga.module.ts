import { Module } from '@nestjs/common';
import { RegisterUserSage } from './register-user/register-user.saga';

const sagas = [RegisterUserSage];

@Module({
  providers: [...sagas],
  exports: [...sagas],
})
export class UserSagaModule {}
