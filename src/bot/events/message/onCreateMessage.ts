import _ from 'lodash';;
import { Message, Client } from 'discord.js';
import { savePostFromMessage } from '../../lib/post';
import { isAllowedGuild } from '../../lib/validate';

// const notiMessage = async (msg, model, price) => {
// };

const onCreateMessage = async (client: Client) => {
  client.on('messageCreate', async (msg: Message) => {
    try {
      if (!isAllowedGuild(msg.guild?.id)) return ;

      await savePostFromMessage(msg);
    } catch (e) {
      console.log(e);
    }
  });
};

export default {
	on: onCreateMessage
};