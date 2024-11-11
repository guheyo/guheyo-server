import { registerEnumType } from '@nestjs/graphql';

export enum GroupStatus {
  MINOR = 'MINOR',
  MAJOR = 'MAJOR',
}

registerEnumType(GroupStatus, {
  name: 'GroupStatus',
  description: 'The status of the group (either MINOR or MAJOR)',
});
