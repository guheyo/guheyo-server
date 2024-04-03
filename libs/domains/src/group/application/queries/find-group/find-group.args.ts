import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindGroupArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug?: string;
}
