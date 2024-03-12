import { CommandHandler } from '@nestjs/cqrs';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateDemandBumpCommand } from './create-demand-bump.command';

@CommandHandler(CreateDemandBumpCommand)
export class CreateDemandBumpHandler extends PrismaCommandHandler<CreateDemandBumpCommand> {
  async execute(command: CreateDemandBumpCommand): Promise<void> {
    await this.prismaService.demandBump.create({
      data: command,
    });
  }
}
