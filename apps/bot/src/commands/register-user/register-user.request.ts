import { User } from 'discord.js';
import { UserOption } from 'necord';

export class RegisterUserRequest {
  @UserOption({
    name: 'user',
    description: 'User',
    required: true,
  })
  user: User;
}
