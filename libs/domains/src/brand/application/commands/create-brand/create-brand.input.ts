import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLinkInput } from '../create-link/create-link.input';

@InputType()
export class CreateBrandInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  slug?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  logo?: string;

  @IsString({ each: true })
  @Field(() => [ID])
  groupIds: string[];

  @ValidateNested({ each: true })
  @Type(() => CreateLinkInput)
  @Field(() => [CreateLinkInput])
  links: CreateLinkInput[];
}
