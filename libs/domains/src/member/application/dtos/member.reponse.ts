import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RoleReponse } from './role.reponse';

@ObjectType()
export class MemberReponse {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field()
  userId: string;

  @Field()
  guildId: string;

  @IsOptional()
  @Type(() => RoleReponse)
  @Field(() => [RoleReponse], { nullable: true })
  roles: RoleReponse[];

  constructor(partial: Partial<MemberReponse>) {
    Object.assign(this, partial);
  }
}
