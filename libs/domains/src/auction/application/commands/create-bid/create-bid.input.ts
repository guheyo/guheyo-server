import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateBidInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  canceledAt?: Date;

  @IsNumber()
  @Field(() => Int)
  price: number;

  @IsString()
  @Field()
  priceCurrency: string;

  @IsUUID()
  @Field()
  auctionId: string;

  @IsUUID()
  @Field()
  userId: string;

  @IsString()
  @Field()
  userAgent: string;
}
