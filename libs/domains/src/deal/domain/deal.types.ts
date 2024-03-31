export const DEAL_TYPES = ['offer', 'demand', 'swap'] as const;

export type DealType = (typeof DEAL_TYPES)[number];
