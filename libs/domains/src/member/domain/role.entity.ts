import { Field, GraphQLISODateTime, ID, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class RoleEntity implements Role {
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Exclude()
  @Field(() => GraphQLISODateTime)
  updateedAt: Date;

  @IsOptional()
  @Exclude()
  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Date | null;

  @Field()
  name: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  rank: number | null;

  @Field()
  hexColor: string = '#000000';
}
