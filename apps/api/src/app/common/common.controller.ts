import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class CommonController {
  @Get('favicon.ico')
  getFavicon(@Res() res: Response): string {
    return 'NO CONTENT';
  }

  @Get()
  getNoContent(@Res() res: Response): string {
    return 'NO CONTENT';
  }
}
