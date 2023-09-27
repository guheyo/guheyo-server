import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  rank?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  hexColor?: string;

  @IsUUID()
  @Field(() => ID)
  guildId: string;
}
