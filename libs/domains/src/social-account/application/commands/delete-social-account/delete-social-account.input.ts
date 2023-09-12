import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteSocialAccountInput {
  @IsUUID()
  @Field()
  id: string;
}
