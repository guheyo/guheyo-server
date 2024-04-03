import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsUUID()
  @Field()
  id: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  username?: string;

  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  about?: string;

  @IsOptional()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  avatarURL?: string;
}
