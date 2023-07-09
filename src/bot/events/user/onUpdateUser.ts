import _ from 'lodash';;
import { Client } from 'discord.js';
import imageService from '../../../services/imageService';
import { prisma } from '../../../loaders';
import { getOrCreateUser, getUsername, setNickname } from '../../lib/user';

const onUpdateUser = async (client: Client) => {
  client.on('userUpdate', async (oldUser, newUser) => {
    try {      
      const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID!);
      const member = guild!.members.cache.get(newUser.id);
      if (!member) return ;
      const user = await getOrCreateUser(member);

      let avatarURL = null;
      const newAvataURL = newUser.avatarURL();
      if (oldUser.avatarURL() !== newAvataURL) {
        if (newAvataURL) {
          avatarURL = await imageService.uploadFileFromURL({url: newAvataURL, type: 'users', id: user.id});
        }
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          username: getUsername(newUser),
          avatarURL: avatarURL,
        }
      });
      await setNickname(member);
    } catch(e) {
      console.log(e);
    }
  });
};

export default {
	on: onUpdateUser
};