import { NumberOption } from 'necord';

export class ApplyUserRolesRequest {
  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
