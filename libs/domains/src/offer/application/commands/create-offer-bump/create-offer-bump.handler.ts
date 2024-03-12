import { CommandHandler } from '@nestjs/cqrs';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateOfferBumpCommand } from './create-offer-bump.command';

@CommandHandler(CreateOfferBumpCommand)
export class CreateOfferBumpHandler extends PrismaCommandHandler<CreateOfferBumpCommand> {
  async execute(command: CreateOfferBumpCommand): Promise<void> {
    await this.prismaService.offerBump.create({
      data: command,
    });
  }
}
