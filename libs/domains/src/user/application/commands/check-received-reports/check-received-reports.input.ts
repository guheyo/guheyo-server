import { IsUUID } from 'class-validator';

export class CheckReceivedReportsInput {
  @IsUUID()
  userId: string;
}
