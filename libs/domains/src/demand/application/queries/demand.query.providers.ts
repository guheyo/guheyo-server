import { FindDemandHandler } from './find-demand/find-demand.handler';
import { FindDemandPreviewsHandler } from './find-demand-previews/find-demand-previews.handler';
import { FindDemandCountHandler } from './find-demand-count/find-demand-count.handler';

export const DEMAND_QUERY_PROVIDERS = [
  FindDemandHandler,
  FindDemandPreviewsHandler,
  FindDemandCountHandler,
];
