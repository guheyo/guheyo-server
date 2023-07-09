import { Client, Collection, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export interface Command {
  data: SlashCommandBuilder,
  execute: (interaction: ChatInputCommandInteraction) => void 
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>
  }
}