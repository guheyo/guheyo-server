import { StringOption } from 'necord';

export class RejectBidsRequest {
  @StringOption({
    name: 'memberid',
    description: 'member id',
    required: true,
  })
  memberId: string;
}
