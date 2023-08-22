import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpResponse } from '@lib/shared';

export class BotException {
  notFound(): HttpException {
    const response = new HttpResponse(HttpStatus.NOT_FOUND, 'not found');
    return new NotFoundException(response);
  }
}
