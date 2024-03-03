import { join } from 'path';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { loadYaml } from '@lib/shared/config';
import { ImageService } from '../image.service';

describe('ImageService', () => {
  let imageService: ImageService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [loadYaml(join(__dirname, 'config.test.yaml'), 'utf-8')],
        }),
      ],
      providers: [ImageService],
    }).compile();

    imageService = moduleRef.get<ImageService>(ImageService);
  });

  describe('imageService', () => {
    it('should be defined', () => {
      expect(imageService).toBeDefined();
    });

    it('should be upload file from url', async () => {
      const url = await imageService.uploadFileFromURL(
        'https://i.imgur.com/MKeEzUx.jpeg',
        'test',
        '0',
      );
      expect(typeof url).toBe('string');
    });

    it('should generate signed url', async () => {
      const signedUrl = await imageService.generateSignedUrl('tests', '0', 'test.jpg');
      expect(typeof signedUrl).toBe('string');
    });
  });
});
