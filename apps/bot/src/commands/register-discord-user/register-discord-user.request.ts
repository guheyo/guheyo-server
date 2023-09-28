import { User } from 'discord.js';
import { UserOption } from 'necord';

export class RegisterDiscordUserRequest {
  @UserOption({
    name: 'user',
    description: 'User',
    required: true,
  })
  user: User;
}
