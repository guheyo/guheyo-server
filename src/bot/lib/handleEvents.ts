import { Client } from 'discord.js';
import path from 'path';
import fs from 'fs';

const handleEvents = async (client: Client) => {
  const foldersPath = path.join(__dirname, '../../bot/events');
  const eventFolders = fs.readdirSync(foldersPath);
  
  for (const folder of eventFolders) {
    const eventsPath = path.join(foldersPath, folder);
    const handleEventFiles = fs.readdirSync(eventsPath).filter(file => /(\.ts$)|(\.js$)/.test(file));
    for (const file of handleEventFiles) {
      const filePath = path.join(eventsPath, file);
      try {
        await handleEvent(client, filePath);
      } catch (err) {
        console.log(err);
      }
    }
  };
};

const handleEvent = async (client: Client, filePath: string) => {
  const handleEvent = (await import(filePath)).default;
  handleEvent.on(client);
};

export default handleEvents;