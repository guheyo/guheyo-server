import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { REPORT_PROVIDERS } from '@lib/domains/report/report.providers';
import { ReportResolver } from './report.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [ReportResolver, ...REPORT_PROVIDERS],
})
export class ReportModule {}
