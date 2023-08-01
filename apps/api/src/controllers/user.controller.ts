import { Controller, Get, HttpStatus, Inject, Param, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '@lib/core';
import { IUserService } from '@app/api/interfaces';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @ApiOperation({
    summary: 'Retrieve a user by id',
  })
  @Version('1')
  @Get('/user')
  async findOne(@Param('userId') userId: number): Promise<HttpResponse<number>> {
    const data = await this.userService.findOne(userId);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }
}
