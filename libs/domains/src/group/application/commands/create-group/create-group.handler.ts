import { CommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateGroupCommand } from './create-group.command';
import { GroupSavePort } from '../../ports/out/group.save.port';
import { GroupResponse } from '../../dtos/group.response';
import { GroupLoadPort } from '../../ports/out/group.load.port';

@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler extends PrismaCommandHandler<CreateGroupCommand, GroupResponse> {
  constructor(
    @Inject('GroupSavePort') private savePort: GroupSavePort,
    @Inject('GroupLoadPort') private loadPort: GroupLoadPort,
  ) {
    super(GroupResponse);
  }

  async execute(command: CreateGroupCommand): Promise<void> {
    await this.savePort.create(new GroupEntity(command));

    const categoryIds = await this.prismaService.category.findMany({
      where: {
        type: {
          in: ['gb', 'community'],
        },
      },
    });

    await this.prismaService.group.update({
      where: {
        id: command.id,
      },
      data: {
        categories: {
          create: command.categories,
          connect: categoryIds,
        },
      },
    });
  }
}
