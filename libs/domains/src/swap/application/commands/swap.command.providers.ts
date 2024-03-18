import { CreateSwapHandler } from './create-swap/create-swap.handler';
import { UpdateSwapHandler } from './update-swap/update-swap.handler';
import { DeleteSwapHandler } from './delete-swap/delete-swap.handler';
import { BumpSwapHandler } from './bump-swap/bump-swap.handler';
import { CommentSwapReportHandler } from './comment-swap-report/comment-swap-report.handler';
import { CheckSwapReportsHandler } from './check-swap-reports/check-swap-reports.handler';

export const SWAP_COMMAND_PROVIDERS = [
  CreateSwapHandler,
  UpdateSwapHandler,
  DeleteSwapHandler,
  BumpSwapHandler,
  CommentSwapReportHandler,
  CheckSwapReportsHandler,
];
