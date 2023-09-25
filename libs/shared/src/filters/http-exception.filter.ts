import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const { req } = gqlHost.getContext<{ req: FastifyRequest }>();

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

    return exception;
  }
}
