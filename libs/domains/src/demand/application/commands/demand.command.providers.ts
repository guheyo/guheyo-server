import { CreateDemandHandler } from './create-demand/create-demand.handler';
import { UpdateDemandHandler } from './update-demand/update-demand.handler';
import { DeleteDemandHandler } from './delete-demand/delete-demand.handler';
import { BumpDemandHandler } from './bump-demand/bump-demand.handler';
import { CheckDemandReportsHandler } from './check-demand-reports/check-demand-reports.handler';

export const DEMAND_COMMAND_PROVIDERS = [
  CreateDemandHandler,
  UpdateDemandHandler,
  DeleteDemandHandler,
  BumpDemandHandler,
  CheckDemandReportsHandler,
];
