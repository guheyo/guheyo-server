import { Field, ObjectType } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { VersionPreviewResponse } from './version-preview.response';

@ObjectType()
export class VersionResponse extends VersionPreviewResponse {
  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  constructor(partial: Partial<VersionResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
