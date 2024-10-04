import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpsertBrandsFromCsvInput } from './upsert-brands-from-csv.input';

export class UpsertBrandsFromCsvCommand implements ICommand {
  filePath: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpsertBrandsFromCsvInput; user: MyUserResponse }) {
    this.filePath = input.filePath;
    this.user = user;
  }
}
