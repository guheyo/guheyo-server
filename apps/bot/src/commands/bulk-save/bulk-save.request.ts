import { NumberOption, StringOption } from 'necord';

export class BulkSaveRequest {
  @StringOption({
    name: 'guild-name',
    description: 'guild name',
    required: true,
  })
  guildName: string;

  @StringOption({
    name: 'category-name',
    description: 'category name',
    required: true,
  })
  categoryName: string;

  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;
}
