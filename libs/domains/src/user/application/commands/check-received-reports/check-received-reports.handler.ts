import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { CheckReceivedReportsCommand } from './check-received-reports.command';
import { UserSavePort } from '../../ports/out/user.save.port';
import { UserLoadPort } from '../../ports/out/user.load.port';

@CommandHandler(CheckReceivedReportsCommand)
export class CheckReceivedReportsHandler implements ICommandHandler<CheckReceivedReportsCommand> {
  constructor(
    @Inject('UserLoadPort')
    private readonly userLoadPort: UserLoadPort,
    @Inject('UserSavePort')
    private readonly userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CheckReceivedReportsCommand): Promise<void> {
    let user = await this.userLoadPort.findById(command.userId);
    if (!user) throw new NotFoundException(UserErrorMessage.USER_IS_NOT_FOUND);

    user = this.publisher.mergeObjectContext(user);
    user.checkReceivedReports();
    user.commit();
  }
}
