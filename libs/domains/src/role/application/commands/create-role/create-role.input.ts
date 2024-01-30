import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  position: number;

  @IsString()
  @Field(() => String, { defaultValue: '#000000' })
  hexColor: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;
}
