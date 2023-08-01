import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpResponse } from '@lib/core';

export class ApiException {
  userNotFound(): HttpException {
    const response = new HttpResponse(HttpStatus.NOT_FOUND, 'user not found');
    return new NotFoundException(response);
  }
}
