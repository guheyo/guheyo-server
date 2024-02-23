import { FindDemandByIdHandler } from './find-demand-by-id/find-demand-by-id.handler';
import { FindDemandHandler } from './find-demand/find-demand.handler';
import { FindDemandPreviewsHandler } from './find-demand-previews/find-demand-previews.handler';

export const DEMAND_QUERY_PROVIDERS = [
  FindDemandByIdHandler,
  FindDemandHandler,
  FindDemandPreviewsHandler,
];
