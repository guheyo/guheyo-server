import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { UpsertBrandsFromCsvCommand } from './upsert-brands-from-csv.command';
import { BrandDetailResponse } from '../../dtos/brand-detail.response';
import { BrandSavePort } from '../../ports/out/brand.save.port';
import { BrandLoadPort } from '../../ports/out/brand.load.port';

@CommandHandler(UpsertBrandsFromCsvCommand)
export class UpsertBrandsFromCsvHandler extends PrismaCommandHandler<
  UpsertBrandsFromCsvCommand,
  BrandDetailResponse
> {
  constructor(
    @Inject('BrandSavePort') private savePort: BrandSavePort,
    @Inject('BrandLoadPort') private loadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
  ) {
    super(BrandDetailResponse);
  }

  async execute(command: UpsertBrandsFromCsvCommand) {
    const brands: any[] = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(command.filePath)
        .pipe(fastCsv.parse({ headers: true }))
        .on('data', (row: any) => {
          brands.push({
            name: row.name,
            slug: row.slug,
            description: row.description,
            logo: row.logo,
            url: row.url,
            groupNames: row.groups
              ? row.groups.split(',').map((groupName: string) => groupName.trim())
              : [],
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
    // TODO
  }
}
