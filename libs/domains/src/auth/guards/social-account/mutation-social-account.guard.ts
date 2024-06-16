import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SocialAccountGuard } from './social-account.guard';

@Injectable()
export class MutationSocialAccountGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => SocialAccountGuard))
    private readonly socialAccountGuard: SocialAccountGuard,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();

    if (!(info.parentType.name === 'Mutation')) {
      return true; // Allow queries by default
    }

    return this.socialAccountGuard.canActivate(context);
  }
}
