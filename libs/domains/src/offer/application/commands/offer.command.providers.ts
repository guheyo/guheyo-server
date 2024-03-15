import { CreateOfferHandler } from './create-offer/create-offer.handler';
import { UpdateOfferHandler } from './update-offer/update-offer.handler';
import { DeleteOfferHandler } from './delete-offer/delete-offer.handler';
import { BumpOfferHandler } from './bump-offer/bump-offer.handler';
import { CommentOfferReportHandler } from './comment-offer-report/comment-offer-report.handler';
import { CheckOfferReportsHandler } from './check-offer-reports/check-offer-reports.handler';

export const OFFER_COMMAND_PROVIDERS = [
  CreateOfferHandler,
  UpdateOfferHandler,
  DeleteOfferHandler,
  BumpOfferHandler,
  CommentOfferReportHandler,
  CheckOfferReportsHandler,
];
