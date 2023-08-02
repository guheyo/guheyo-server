import { Controller, Get, HttpStatus, Inject, Param, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '@lib/response/http.response';
import { User } from '@prisma/client';
import { IUserService } from '~apis/src/interfaces';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @ApiOperation({
    summary: 'Retrieve a user by id',
  })
  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<HttpResponse<User>> {
    const data = await this.userService.getUser(userId);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }
}
