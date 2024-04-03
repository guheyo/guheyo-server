import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    let req: Request;
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      req = ctx.getRequest<Request>();
      this.log(req, exception);
    }
    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      req = gqlHost.getContext<{ req: Request }>().req;
      this.log(req, exception);
    }
    return exception;
  }

  log(req: Request, exception: HttpException) {
    this.logger.error(
      {
        req: {
          method: req.method,
          url: req.url,
          body: req.body,
        },
      },
      exception.stack,
    );
  }
}
