import { CommandHandler } from '@nestjs/cqrs';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateSwapBumpCommand } from './create-swap-bump.command';

@CommandHandler(CreateSwapBumpCommand)
export class CreateSwapBumpHandler extends PrismaCommandHandler<CreateSwapBumpCommand> {
  async execute(command: CreateSwapBumpCommand): Promise<void> {
    await this.prismaService.swapBump.create({
      data: command,
    });
  }
}
