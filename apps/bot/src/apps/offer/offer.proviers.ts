import { BOT_BUY_PROVIDERS } from './buy/buy.providers';
import { BOT_SELL_PROVIDERS } from './sell/sell.providers';
import { BOT_SWAP_PROVIDERS } from './swap/swap.providers';

export const BOT_OFFER_PROVIDERS = [
  ...BOT_SELL_PROVIDERS,
  ...BOT_BUY_PROVIDERS,
  ...BOT_SWAP_PROVIDERS,
];
