import { NumberOption, StringOption } from 'necord';

export class BulkSaveRequest {
  @StringOption({
    name: 'guild-name',
    description: 'guild name',
    required: true,
  })
  guildName: string;

  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
