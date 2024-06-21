import { NumberOption, StringOption } from 'necord';

export class CountPostsRequest {
  @StringOption({
    name: 'channel-id',
    description: 'channel id',
    required: true,
  })
  channelId: string;

  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
