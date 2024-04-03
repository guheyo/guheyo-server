import { SwapEntity } from '@lib/domains/swap/domain/swap.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface SwapLoadPort extends LoadPort<SwapEntity> {}
