import { Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Member } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class MemberEntity implements Member {
  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Exclude()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @IsOptional()
  @Exclude()
  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Date | null;

  @Field()
  userId: string;

  @Field()
  guildId: string;

  @IsOptional()
  @Type(() => RoleEntity)
  @Field(() => [RoleEntity], { nullable: true })
  roles: RoleEntity[];
}
