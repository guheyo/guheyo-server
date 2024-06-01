import { NumberOption, StringOption } from 'necord';

export class ApplySocialRoleRequest {
  @StringOption({
    name: 'provider',
    description: 'provider',
    required: true,
  })
  provider: string;

  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
