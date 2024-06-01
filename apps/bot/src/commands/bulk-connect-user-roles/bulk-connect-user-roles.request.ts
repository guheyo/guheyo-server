import { NumberOption } from 'necord';

export class BulkConnectUserRolesRequest {
  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
