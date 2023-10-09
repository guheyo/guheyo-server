import { IsString, IsUUID } from 'class-validator';

export class UntrackUserImagesArgs {
  @IsString()
  type: string;

  @IsUUID()
  refId: string;
}
