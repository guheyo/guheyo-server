import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { HttpResponse } from "@lib/response/http.response";

export class BotException {
  NotFound(): HttpException {
    const response = new HttpResponse(HttpStatus.NOT_FOUND, "not found");
    return new NotFoundException(response);
  }

}
