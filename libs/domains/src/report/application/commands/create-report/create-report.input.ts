import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateReportInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  offerId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  demandId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  swapId?: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsString()
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content: string;

  @IsString()
  @Field(() => String, { defaultValue: 'open' })
  status: string;
}
