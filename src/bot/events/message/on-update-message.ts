import { Message, Client, PartialMessage } from 'discord.js';
import { updatePostFromMessage } from '../../lib/post';
import { isAllowedGuild } from '../../lib/validate';

const onUpdateMessage = async (client: Client) => {
  client.on(
    'messageUpdate',
    async (
      oldMsg: Message | PartialMessage,
      newMsg: Message | PartialMessage,
    ) => {
      try {
        if (!isAllowedGuild(newMsg.guild?.id)) return;

        await updatePostFromMessage(oldMsg, newMsg);
      } catch (e) {
        console.log(e);
      }
    },
  );
};

export default {
  on: onUpdateMessage,
};
