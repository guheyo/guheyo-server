import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ThrottlerBehindProxyGuard } from '../throttler/throttler-behind-proxy.guard';

@UseGuards(ThrottlerBehindProxyGuard)
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
