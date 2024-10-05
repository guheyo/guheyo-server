import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { ImageService } from '@lib/shared';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { LinkEntity } from '@lib/domains/brand/domain/link.entity';
import { PlatformService } from '@lib/domains/platform/application/services/platform.service';
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
    @Inject('BrandSavePort') private readonly brandSavePort: BrandSavePort,
    @Inject('BrandLoadPort') private readonly brandLoadPort: BrandLoadPort,
    private readonly publisher: EventPublisher,
    private readonly imageService: ImageService,
    private readonly platformService: PlatformService,
  ) {
    super(BrandDetailResponse);
  }

  async execute(command: UpsertBrandsFromCsvCommand) {
    const brandsData = await this.parseCsv(command.filePath);

    const groups = await this.prismaService.group.findMany();
    const platforms = await this.prismaService.platform.findMany();

    const brandEntities = await this.createBrandEntities(brandsData, command, groups, platforms);
    const brandNames = brandEntities.map((brand) => brand.name);
    const existingBrandNames = await this.getExistingBrandNames(brandNames);

    const { newBrandEntities, existingBrandEntities } = this.separateNewAndExistingBrandEntities(
      brandEntities,
      existingBrandNames,
    );

    if (newBrandEntities.length > 0) {
      this.brandSavePort.createMany(newBrandEntities);
    }
    if (existingBrandEntities) {
      existingBrandEntities.map((brand) =>
        brand.update({
          id: brand.id,
          name: brand.name,
          slug: brand.slug || undefined,
          description: brand.description || undefined,
          logo: brand.logo || undefined,
          groups: brand.groups || undefined,
          links: brand.links,
        }),
      );
    }
  }

  /**
   * Parses the CSV file to extract brand data.
   */
  private async parseCsv(filePath: string): Promise<any[]> {
    const brandsData: any[] = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(fastCsv.parse({ headers: true }))
        .on('data', (row: any) => {
          brandsData.push({
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
    return brandsData;
  }

  /**
   * Creates brand entities from the CSV data.
   */
  private async createBrandEntities(
    brandsData: any[],
    command: UpsertBrandsFromCsvCommand,
    groups: any[],
    platforms: any[],
  ): Promise<BrandEntity[]> {
    return Promise.all(
      brandsData.map(async (brandData) => {
        const platformName = this.platformService.parsePlatformName(brandData.url);
        const platformId = platforms.find((platform) => platform.name === platformName)?.id;

        const logoUrl = await this.imageService.uploadFileFromURL({
          url: brandData.logo,
          type: 'brand',
          userId: command.user.id,
        });

        const links = platformId
          ? [
              new LinkEntity({
                brandId: brandData.id,
                platformId,
                url: brandData.url,
                position: 0,
              }),
            ]
          : [];

        return new BrandEntity({
          id: brandData.id,
          name: brandData.name,
          slug: brandData.slug,
          description: brandData.description,
          logo: logoUrl,
          groups: groups.filter((group) => brandData.groupNames.includes(group.name)),
          links,
        });
      }),
    );
  }

  private async getExistingBrandNames(brandNames: string[]) {
    const brands = await this.prismaService.brand.findMany({
      where: {
        name: {
          in: brandNames,
        },
      },
    });
    return brands.map((brand) => brand.name);
  }

  /**
   * Categorizes brands into new and existing ones and processes them accordingly.
   */
  private separateNewAndExistingBrandEntities(
    brandEntities: BrandEntity[],
    existingBrandNames: string[],
  ) {
    const newBrandEntities = brandEntities.filter(
      (brand) => !existingBrandNames.includes(brand.name),
    );
    const existingBrandEntities = brandEntities.filter((brand) =>
      existingBrandNames.includes(brand.name),
    );

    return {
      newBrandEntities,
      existingBrandEntities,
    };
  }
}
