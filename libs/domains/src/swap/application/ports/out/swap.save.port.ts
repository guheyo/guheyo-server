import { SwapEntity } from '@lib/domains/swap/domain/swap.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface SwapSavePort extends SavePort<SwapEntity> {}
