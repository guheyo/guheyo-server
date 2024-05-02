import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class ConnectRolesInput {
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
