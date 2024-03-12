import { CreateDemandHandler } from './create-demand/create-demand.handler';
import { UpdateDemandHandler } from './update-demand/update-demand.handler';
import { DeleteDemandHandler } from './delete-demand/delete-demand.handler';
import { CreateDemandBumpHandler } from './create-demand-bump/create-demand-bump.handler';
import { BumpDemandHandler } from './bump-demand/bump-demand.handler';

export const DEMAND_COMMAND_PROVIDERS = [
  CreateDemandHandler,
  UpdateDemandHandler,
  DeleteDemandHandler,
  CreateDemandBumpHandler,
  BumpDemandHandler,
];
