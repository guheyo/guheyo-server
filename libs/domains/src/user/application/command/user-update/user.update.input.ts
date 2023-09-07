import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @Field({ nullable: true })
  avatarURL?: string;
}
