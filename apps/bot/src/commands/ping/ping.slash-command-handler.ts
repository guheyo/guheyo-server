import { OwnerGuard } from '@app/bot/apps/user/guards/owner.guard';
import { Injectable, UseGuards } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@UseGuards(OwnerGuard)
@Injectable()
export class PingSlashCommandHandler {
  @SlashCommand({ name: 'ping', description: 'Ping-Pong Command' })
  public async onPing(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }
}
