import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ExtractedJwtPayload = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return data ? req.user?.[data] : req.user;
  },
);
