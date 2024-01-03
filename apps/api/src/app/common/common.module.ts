import { Module } from '@nestjs/common';
import { DateScalar } from '@lib/shared/scalars/date.scalar';

@Module({
  providers: [DateScalar],
})
export class CommonModule {}
