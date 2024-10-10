import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindGroupProfilesOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  position?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';
}
