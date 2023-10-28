import { FindDemandByIdQuery } from './find-demand-by-id/find-demand-by-id.query';
import { FindDemandsHandler } from './find-demands/find-demands.handler';

export const DEMAND_QUERY_PROVIDERS = [FindDemandByIdQuery, FindDemandsHandler];
