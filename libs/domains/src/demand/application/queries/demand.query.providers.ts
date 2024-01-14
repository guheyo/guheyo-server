import { FindDemandByIdHandler } from './find-demand-by-id/find-demand-by-id.handler';
import { FindDemandsHandler } from './find-demands/find-demands.handler';

export const DEMAND_QUERY_PROVIDERS = [FindDemandByIdHandler, FindDemandsHandler];
