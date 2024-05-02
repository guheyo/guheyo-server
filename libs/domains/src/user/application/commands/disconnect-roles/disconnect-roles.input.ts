import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class DisconnectRolesInput {
  @IsString({ each: true })
  @Field(() => [ID])
  roleIds: string[];

  @IsString({ each: true })
  @Field(() => [String])
  roleNames: string[];
}
