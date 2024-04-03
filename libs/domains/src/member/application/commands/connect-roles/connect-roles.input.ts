import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class ConnectRolesInput {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  groupSlug?: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString({ each: true })
  @Field(() => [ID])
  roleIds: string[];

  @IsString({ each: true })
  @Field(() => [String])
  roleNames: string[];
}
