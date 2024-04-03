import { IsString, IsUUID } from 'class-validator';

export class TrackUserImagesArgs {
  @IsString()
  type: string;

  @IsUUID()
  refId: string;
}
