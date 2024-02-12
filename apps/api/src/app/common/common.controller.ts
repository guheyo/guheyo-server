import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class CommonController {
  @Get('favicon.ico')
  async getFavicon(@Res() res: Response) {
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get()
  async getNoContent(@Res() res: Response) {
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
