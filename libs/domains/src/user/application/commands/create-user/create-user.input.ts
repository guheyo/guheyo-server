import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @Field()
  username: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  avatarURL?: string;
}
