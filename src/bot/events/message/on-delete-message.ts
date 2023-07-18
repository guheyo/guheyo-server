import { Message, Client, PartialMessage } from 'discord.js';
import { deletePostFromMessage } from '../../lib/post';
import { isAllowedGuild } from '../../lib/validate';

const onDeleteMessage = async (client: Client) => {
  client.on('messageDelete', async (msg: Message | PartialMessage) => {
    try {
      if (!isAllowedGuild(msg.guild?.id)) return;

      await deletePostFromMessage(msg);
    } catch (e) {
      console.log(e);
    }
  });
};

export default {
  on: onDeleteMessage,
};
