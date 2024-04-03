import { CommandHandler } from '@nestjs/cqrs';
import { ImageService } from '@lib/shared';
import { SignedUrlResponse } from '@lib/shared/image/image.response';
import { BaseCommandHandler } from '@lib/shared/cqrs/commands/handlers/base-command.handler';
import { CreateSignedUrlCommand } from './create-signed-url.command';

@CommandHandler(CreateSignedUrlCommand)
export class CreateSignedUrlHandler extends BaseCommandHandler<
  CreateSignedUrlCommand,
  SignedUrlResponse
> {
  constructor(private readonly imageService: ImageService) {
    super(SignedUrlResponse);
  }

  async execute(command: CreateSignedUrlCommand): Promise<SignedUrlResponse> {
    return this.imageService.createSignedUrl(command);
  }
}
