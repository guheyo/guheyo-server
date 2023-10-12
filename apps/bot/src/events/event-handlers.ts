import { ReadyHandler } from './ready/ready.handler';
import { WarnHandler } from './warn/warn.handler';
import { DiscordMemberJoinedHandler } from './discord-member-joined/discord-member-joined.handler';
import { DiscordMemberRolesAddedHandler } from './discord-member-roles-added/discord-member-roles-added.handler';
import { DiscordMemberRolesRemovedHandler } from './discord-member-roles-removed/discord-member-roles-removed.handler';
import { OfferMessageCreatedHandler } from './offer-message-created/offer-message-created.handler';
import { OfferMessageUpdatedHandler } from './offer-message-updated/offer-message-updated.handler';
import { OfferMessageDeletedHandler } from './offer-message-deleted/offer-message-deleted.handler';
import { DemandMessageCreatedHandler } from './demand-message-created/demand-message-created.handler';
import { DemandMessageUpdatedHandler } from './demand-message-updated/demand-message-updated.handler';
import { DemandMessageDeletedHandler } from './demand-message-deleted/demand-message-deleted.handler';

export const EVENT_HANDLERS = [
  ReadyHandler,
  WarnHandler,
  DiscordMemberJoinedHandler,
  DiscordMemberRolesAddedHandler,
  DiscordMemberRolesRemovedHandler,
  OfferMessageCreatedHandler,
  OfferMessageUpdatedHandler,
  OfferMessageDeletedHandler,
  DemandMessageCreatedHandler,
  DemandMessageUpdatedHandler,
  DemandMessageDeletedHandler,
];
