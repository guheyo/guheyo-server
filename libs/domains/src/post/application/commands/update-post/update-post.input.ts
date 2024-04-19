import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  archivedAt?: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  pending?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  title?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  categoryId?: string;
}
