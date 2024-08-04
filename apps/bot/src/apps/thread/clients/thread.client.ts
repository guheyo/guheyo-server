import { Injectable, Logger } from '@nestjs/common';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ThreadPost } from '@app/bot/shared/interfaces/post-message.interfaces';
import { CreateThreadInput } from '@lib/domains/thread/application/commands/create-thread/create-thread.input';
import { CreateThreadCommand } from '@lib/domains/thread/application/commands/create-thread/create-thread.command';
import { THREAD } from '@lib/domains/thread/domain/thread.constants';
import { UpdateThreadInput } from '@lib/domains/thread/application/commands/update-thread/update-thread.input';
import { UpdateThreadCommand } from '@lib/domains/thread/application/commands/update-thread/update-thread.command';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { ThreadParser } from '../parsers/thread.parser';

@Injectable()
export class ThreadClient extends UserImageClient {
  constructor(protected readonly threadParser: ThreadParser) {
    super();
  }

  private readonly logger = new Logger(ThreadClient.name);

  async createThread({ input, user }: { input: CreateThreadInput; user: MyUserResponse }) {
    await this.commandBus.execute(new CreateThreadCommand({ input, user, userAgent: DISCORD }));
  }

  async updateThread({ input, user }: { input: UpdateThreadInput; user: MyUserResponse }) {
    await this.commandBus.execute(new UpdateThreadCommand({ input, user }));
  }

  async createThreadFromPost({
    user,
    threadPost,
    group,
    categorySource,
  }: {
    user: MyUserResponse;
    threadPost: ThreadPost;
    group: GroupResponse;
    categorySource: string;
  }) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      threadPost.starterMessage,
      THREAD,
    );
    const createThreadInput = this.threadParser.parseCreateThreadInput({
      threadPost,
      group,
      categorySource,
    });

    await this.uploadAndCreateAttachments(user, uploadUserImageInputList, THREAD);
    await this.createThread({ input: createThreadInput, user });
    this.logger.log(`thread<@${createThreadInput.id}> created`);
  }

  async updateThreadFromPost(user: MyUserResponse, threadPost: ThreadPost) {
    const updateThreadInput = this.threadParser.parseUpdateThreadInput(threadPost);
    await this.updateThread({ input: updateThreadInput, user });
    this.logger.log(`thread <@${updateThreadInput.id}> updated`);
  }
}
