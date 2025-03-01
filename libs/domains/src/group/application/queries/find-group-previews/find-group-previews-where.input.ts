import { GroupStatus } from '@lib/domains/group/domain/group.enums';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindGroupPreviewsWhereInput {
  @IsOptional()
  @Field(() => GroupStatus, { nullable: true })
  status?: GroupStatus;
}
