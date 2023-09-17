import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindMyUserBySocialAccountArgs {
  constructor(
    public readonly provider: string,
    public readonly socialId: string,
  ) {}
}
