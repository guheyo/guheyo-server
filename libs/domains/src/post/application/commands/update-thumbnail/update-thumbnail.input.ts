import { InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateThumbnailInput {
  @IsUUID()
  postId: string;

  @IsString()
  type: string;

  @IsUUID()
  refId: string;
}
