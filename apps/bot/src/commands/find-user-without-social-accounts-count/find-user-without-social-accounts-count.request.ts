import { StringOption } from 'necord';

export class FindUserWithoutSocialAccountsCountRequest {
  @StringOption({
    name: 'providers',
    description: 'providers',
    required: true,
  })
  providers: string;
}
