import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindVersionArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  tableName?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  refId?: string;
}
