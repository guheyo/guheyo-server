import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateAuctionInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  businessFunction?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  brandId?: string;
}
