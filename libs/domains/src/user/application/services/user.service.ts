import { ImageService } from '@lib/shared';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  @Inject() private readonly imageService: ImageService;

  async uploadAvatar(url: string, id: string): Promise<string> {
    return this.imageService.uploadFileFromURL(url, `users/${id}/avatars`);
  }
}
