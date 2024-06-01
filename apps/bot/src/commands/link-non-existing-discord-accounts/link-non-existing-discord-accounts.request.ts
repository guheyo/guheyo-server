import { NumberOption } from 'necord';

export class LinkNonExistingDiscordAccountsRequest {
  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
