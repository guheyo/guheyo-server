import { CancelReactionHandler } from './cancel-reaction/cancel-reaction.handler';
import { CreateReactionHandler } from './create-reaction/create-reaction.handler';

export const REACTION_COMMAND_PROVIDERS = [CreateReactionHandler, CancelReactionHandler];
