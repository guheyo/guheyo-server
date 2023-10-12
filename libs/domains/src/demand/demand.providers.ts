import { DemandRepository } from './adapter/out/persistence/demand.repository';
import { DEMAND_COMMAND_PROVIDERS } from './application/commands/demand.command.providers';
import { DEMAND_QUERY_PROVIDERS } from './application/queries/demand.query.providers';
import { DEMAND_EVENT_PROVIDERS } from './application/events/demand.event.providers';
import { DemandSagas } from './application/sagas/demand.sagas';

export const DEMAND_PROVIDERS = [
  {
    provide: 'DemandLoadPort',
    useClass: DemandRepository,
  },
  {
    provide: 'DemandSavePort',
    useClass: DemandRepository,
  },
  ...DEMAND_COMMAND_PROVIDERS,
  ...DEMAND_QUERY_PROVIDERS,
  ...DEMAND_EVENT_PROVIDERS,
  DemandSagas,
];
