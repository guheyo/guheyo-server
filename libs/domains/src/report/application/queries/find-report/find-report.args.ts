import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindReportArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  type?: string;

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

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  authorId?: string;
}
