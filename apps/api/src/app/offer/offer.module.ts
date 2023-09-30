import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OFFER_PROVIDERS } from '@lib/domains/offer/offer.providers';
import { OfferResolver } from './offer.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [OfferResolver, ...OFFER_PROVIDERS],
})
export class OfferModule {}
