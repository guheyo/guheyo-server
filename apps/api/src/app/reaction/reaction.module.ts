import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { REACTION_PROVIDERS } from '@lib/domains/reaction/reaction.providers';
import { ReactionResolver } from './reaction.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [ReactionResolver, ...REACTION_PROVIDERS],
})
export class ReactionModule {}
