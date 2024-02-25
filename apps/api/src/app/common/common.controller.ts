import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';

@UseGuards(ThrottlerGuard)
@Controller()
export class CommonController {
  @Get('favicon.ico')
  getFavicon(@Res() res: Response) {
    res.status(HttpStatus.NOT_FOUND).send();
  }

  @Get()
  getNoContent(@Res() res: Response) {
    res.status(HttpStatus.NOT_FOUND).send();
  }
}
