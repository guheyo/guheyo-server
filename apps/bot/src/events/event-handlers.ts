import { ReadyHandler } from './ready/ready.handler';
import { WarnHandler } from './warn/warn.handler';
import { DiscordMemberJoinedHandler } from './discord-member-joined/discord-member-joined.handler';
import { DiscordMemberRolesAddedHandler } from './discord-member-roles-added/discord-member-roles-added.handler';
import { DiscordMemberRolesRemovedHandler } from './discord-member-roles-removed/discord-member-roles-removed.handler';
import { SellMessageCreatedHandler } from './sell-message-created/sell-message-created.handler';
import { SellMessageUpdatedHandler } from './sell-message-updated/sell-message-updated.handler';
import { BuyMessageCreatedHandler } from './buy-message-created/buy-message-created.handler';
import { BuyMessageUpdatedHandler } from './buy-message-updated/buy-message-updated.handler';
import { SwapMessageCreatedHandler } from './swap-message-created/swap-message-created.handler';
import { SwapMessageUpdatedHandler } from './swap-message-updated/swap-message-updated.handler';
import { DiscordUserUpdatedHandler } from './discord-user-updated/discord-user-updated.handler';
import { KakaoRoleRequestedHandler } from './kakao-role-requested/kakao-role-requested.handler';
import { ThreadCreatedHandler } from './thread-created/thread-created.handler';
import { ThreadUpdatedHandler } from './thread-updated/thread-updated.handler';
import { PostCommentCreatedHandler } from './post-comment-created/post-comment-created.handler';
import { PostCommentUpdatedHandler } from './post-comment-updated/post-comment-updated.handler';
import { BuyThreadCreatedHandler } from './buy-thread-created/buy-thread-created.handler';
import { BuyThreadUpdatedHandler } from './buy-thread-updated/buy-thread-updated.handler';
import { SellThreadCreatedHandler } from './sell-thread-created/sell-thread-created.handler';
import { SellThreadUpdatedHandler } from './sell-thread-updated/sell-thread-updated.handler';

export const EVENT_HANDLERS = [
  ReadyHandler,
  WarnHandler,
  DiscordMemberJoinedHandler,
  DiscordMemberRolesAddedHandler,
  DiscordMemberRolesRemovedHandler,
  SellMessageCreatedHandler,
  SellMessageUpdatedHandler,
  BuyMessageCreatedHandler,
  BuyMessageUpdatedHandler,
  SwapMessageCreatedHandler,
  SwapMessageUpdatedHandler,
  DiscordUserUpdatedHandler,
  KakaoRoleRequestedHandler,
  ThreadCreatedHandler,
  ThreadUpdatedHandler,
  PostCommentCreatedHandler,
  PostCommentUpdatedHandler,
  SellThreadCreatedHandler,
  SellThreadUpdatedHandler,
  BuyThreadCreatedHandler,
  BuyThreadUpdatedHandler,
  // NOTE: Delete directly from the web
  // offer, demand, swap messages
];
