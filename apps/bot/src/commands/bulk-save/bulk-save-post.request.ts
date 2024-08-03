import { NumberOption, StringOption } from 'necord';

export class BulkSavePostRequest {
  @StringOption({
    name: 'guild-name',
    description: 'guild name',
    required: true,
  })
  guildName: string;

  @StringOption({
    name: 'channel-name',
    description: 'channel name',
    required: true,
  })
  channelName: string;

  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
