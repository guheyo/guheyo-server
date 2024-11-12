import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateGroupInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  slug: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  icon?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  position?: number;
}
