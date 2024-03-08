import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  constructor(partial: Partial<JwtResponse>) {
    Object.assign(this, partial);
  }
}
