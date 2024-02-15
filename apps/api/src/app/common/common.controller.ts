import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

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
