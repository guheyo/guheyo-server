import { Prisma } from '@prisma/client';

const totalPrice = {
  needs: { price: true, shippingCost: true, shippingType: true },
  compute(deal: any) {
    if (deal.shippingType === 'charge') return deal.price + deal.shippingCost;
    if (deal.shippingType === 'half') return deal.price + 2 * deal.shippingCost;
    return deal.price;
  },
};

export const calculateTotalPrice = Prisma.defineExtension({
  result: {
    offer: {
      totalPrice,
    },
    demand: {
      totalPrice,
    },
    swap: {
      totalPrice,
    },
  },
});
