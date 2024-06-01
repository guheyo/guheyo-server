import { NumberOption, StringOption } from 'necord';

export class FindMembersNeedingSocialRoleRequest {
  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;

  @StringOption({
    name: 'provider',
    description: 'provider',
    required: true,
  })
  provider: string;
}
