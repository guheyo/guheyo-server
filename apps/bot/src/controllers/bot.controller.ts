import { Controller, Get, HttpStatus, Inject, Param, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '@lib/core';
import { IBotService } from '@app/bot/interfaces/services/bot-service.interface';

@ApiTags('bot')
@Controller('bot')
export class BotController {
  constructor(@Inject('IBotService') private readonly botService: IBotService) {}

  @ApiOperation({
    summary: 'Retrieve a bot by id',
  })
  @Version('1')
  @Get('/bot')
  async findOne(@Param('id') id: number): Promise<HttpResponse<undefined>> {
    const data = await this.botService.findOne(id);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }
}
