import { Client } from 'discord.js';
import path from 'path';
import fs from 'fs';

const handleEvent = async (client: Client, filePath: string) => {
  const eventHandler = (await import(filePath)).default;
  eventHandler.on(client);
};

const handleEvents = async (client: Client) => {
  const foldersPath = path.join(__dirname, '../../bot/events');
  const eventFolders = fs.readdirSync(foldersPath);

  eventFolders.forEach((folder) => {
    const eventsPath = path.join(foldersPath, folder);
    const handleEventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => /(\.ts$)|(\.js$)/.test(file));
    handleEventFiles.forEach(async (file) => {
      const filePath = path.join(eventsPath, file);
      try {
        await handleEvent(client, filePath);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

export default handleEvents;
