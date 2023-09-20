import { IsString } from 'class-validator';

export class MemberRolesUpdatedInput {
  @IsString()
  id: string;

  @IsString({ each: true })
  connectedRoleIds: string[];

  @IsString({ each: true })
  disconnectedRoleIds: string[];
}
