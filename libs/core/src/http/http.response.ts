import { HttpStatus } from '@nestjs/common';

export class HttpResponse<T> {
  statusCode: HttpStatus = HttpStatus.OK;

  data?: T;

  message: string;

  constructor(statusCode: HttpStatus, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
