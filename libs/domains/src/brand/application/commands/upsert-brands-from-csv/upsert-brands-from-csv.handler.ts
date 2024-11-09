import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { ImageService } from '@lib/shared';
import { BrandEntity } from '@lib/domains/brand/domain/brand.entity';
import { LinkEntity } from '@lib/domains/brand/domain/link.entity';
import { PlatformService } from '@lib/domains/platform/application/services/platform.service';
import { plainToInstance } from 'class-transformer';
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

  async execute(command: UpsertBrandsFromCsvCommand): Promise<void> {
    const csvData = await this.parseCsvFile(command.filePath);
    const allGroups = await this.prismaService.group.findMany();
    const allCategories = await this.prismaService.category.findMany();
    const allPlatforms = await this.prismaService.platform.findMany();

    const brandEntities = await this.mapToBrandEntities({
      csvData,
      command,
      groups: allGroups,
      categories: allCategories,
      platforms: allPlatforms,
    });
    const existingBrandNames = await this.fetchExistingBrandNames(brandEntities);

    const { newBrands, brandsToUpdate } = this.categorizeBrands(brandEntities, existingBrandNames);

    await this.saveNewBrands(newBrands);
    await this.updateExistingBrands(brandsToUpdate);
  }

  /**
   * Parses the CSV file and returns an array of brand data.
   */
  private async parseCsvFile(filePath: string): Promise<any[]> {
    const csvData: any[] = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(fastCsv.parse({ headers: true }))
        .on('data', (row: any) => {
          csvData.push({
            name: row.name,
            slug: row.slug,
            description: row.description,
            logo: row.logo,
            url: row.url,
            groupNames: row.groups ? row.groups.split(',').map((g: string) => g.trim()) : [],
            categoryNames: row.categories
              ? row.categories.split(',').map((c: string) => c.trim())
              : [],
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
    return csvData;
  }

  /**
   * Maps the CSV data to brand entities.
   */
  private async mapToBrandEntities({
    csvData,
    command,
    groups,
    categories,
    platforms,
  }: {
    csvData: any[];
    command: UpsertBrandsFromCsvCommand;
    groups: any[];
    categories: any[];
    platforms: any[];
  }): Promise<BrandEntity[]> {
    return Promise.all(
      csvData.map(async (brandData) => {
        const platformId = this.getPlatformIdFromUrl(brandData.url, platforms);
        const logoUrl = await this.imageService.uploadFileFromURL({
          url: brandData.logo,
          type: 'brand',
          userId: command.user.id,
        });

        const brandLinks = platformId
          ? [new LinkEntity({ brandId: brandData.id, platformId, url: brandData.url, position: 0 })]
          : [];

        return new BrandEntity({
          id: brandData.id,
          name: brandData.name,
          slug: brandData.slug,
          description: brandData.description,
          logo: logoUrl,
          groups: groups.filter((group) => brandData.groupNames.includes(group.name)),
          categories: categories.filter((category) =>
            brandData.categoryNames.includes(category.name),
          ),
          links: brandLinks,
        });
      }),
    );
  }

  /**
   * Gets the platform ID based on the URL from the platforms list.
   */
  private getPlatformIdFromUrl(url: string, platforms: any[]): string | undefined {
    const platformName = this.platformService.parsePlatformName(url);
    return platforms.find((platform) => platform.name === platformName)?.id;
  }

  /**
   * Fetches the names of existing brands from the database.
   */
  private async fetchExistingBrandNames(brandEntities: BrandEntity[]): Promise<string[]> {
    const brandNames = brandEntities.map((brand) => brand.name);
    const existingBrands = await this.prismaService.brand.findMany({
      where: { name: { in: brandNames } },
    });
    return existingBrands.map((brand) => brand.name);
  }

  /**
   * Categorizes the brands into new and existing ones.
   */
  private categorizeBrands(
    brandEntities: BrandEntity[],
    existingBrandNames: string[],
  ): { newBrands: BrandEntity[]; brandsToUpdate: BrandEntity[] } {
    const newBrands = brandEntities.filter((brand) => !existingBrandNames.includes(brand.name));
    const brandsToUpdate = brandEntities.filter((brand) => existingBrandNames.includes(brand.name));

    return { newBrands, brandsToUpdate };
  }

  /**
   * Saves new brands to the database.
   */
  private async saveNewBrands(newBrands: BrandEntity[]): Promise<void> {
    if (newBrands.length > 0) {
      await this.brandSavePort.createMany(newBrands);
    }
  }

  /**
   * Updates existing brands with new data from CSV.
   */
  private async updateExistingBrands(brandsToUpdate: BrandEntity[]): Promise<void> {
    brandsToUpdate.forEach(async (brandToUpdate) => {
      const existingBrand = await this.prismaService.brand.findFirst({
        where: { name: brandToUpdate.name },
        include: { groups: true, categories: true, links: true },
      });
      const brandEntity = plainToInstance(BrandEntity, existingBrand);

      brandEntity.update({
        name: brandToUpdate.name || undefined,
        slug: brandToUpdate.slug || undefined,
        description: brandToUpdate.description || undefined,
        logo: brandToUpdate.logo || undefined,
        groups: brandToUpdate.groups,
        categories: brandToUpdate.categories,
        links: brandToUpdate.links,
      });

      await this.brandSavePort.save(brandEntity);
    });
  }
}
