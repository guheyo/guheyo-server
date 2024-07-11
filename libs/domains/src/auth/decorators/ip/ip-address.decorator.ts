import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IpAddress = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();

  // original IP address from the X-Forwarded-For header
  return req.ips.length > 0 ? req.ips[0] : req.ip;
});
