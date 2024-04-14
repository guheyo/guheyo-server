export const DEAL_TYPES = ['sell', 'buy', 'swap'] as const;

export type DealType = (typeof DEAL_TYPES)[number];
