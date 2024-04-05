import { ReadyHandler } from './ready/ready.handler';
import { WarnHandler } from './warn/warn.handler';
import { DiscordMemberJoinedHandler } from './discord-member-joined/discord-member-joined.handler';
import { DiscordMemberRolesAddedHandler } from './discord-member-roles-added/discord-member-roles-added.handler';
import { DiscordMemberRolesRemovedHandler } from './discord-member-roles-removed/discord-member-roles-removed.handler';
import { OfferMessageCreatedHandler } from './offer-message-created/offer-message-created.handler';
import { OfferMessageUpdatedHandler } from './offer-message-updated/offer-message-updated.handler';
import { DemandMessageCreatedHandler } from './demand-message-created/demand-message-created.handler';
import { DemandMessageUpdatedHandler } from './demand-message-updated/demand-message-updated.handler';
import { SwapMessageCreatedHandler } from './swap-message-created/swap-message-created.handler';
import { SwapMessageUpdatedHandler } from './swap-message-updated/swap-message-updated.handler';
import { DiscordUserUpdatedHandler } from './discord-user-updated/discord-user-updated.handler';

export const EVENT_HANDLERS = [
  ReadyHandler,
  WarnHandler,
  DiscordMemberJoinedHandler,
  DiscordMemberRolesAddedHandler,
  DiscordMemberRolesRemovedHandler,
  OfferMessageCreatedHandler,
  OfferMessageUpdatedHandler,
  DemandMessageCreatedHandler,
  DemandMessageUpdatedHandler,
  SwapMessageCreatedHandler,
  SwapMessageUpdatedHandler,
  DiscordUserUpdatedHandler,
  // NOTE: Delete directly from the web
  // offer, demand, swap messages
];
