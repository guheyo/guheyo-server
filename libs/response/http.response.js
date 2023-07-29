"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const common_1 = require("@nestjs/common");
class HttpResponse {
    statusCode = common_1.HttpStatus.OK;
    data;
    message;
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
exports.HttpResponse = HttpResponse;
