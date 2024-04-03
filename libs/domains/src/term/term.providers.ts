import { TermRepository } from './adapter/out/persistence/term.repository';
import { TERM_QUERY_PROVIDERS } from './application/queries/term.query.providers';

export const TERM_PROVIDERS = [
  {
    provide: 'TermLoadPort',
    useClass: TermRepository,
  },
  {
    provide: 'TermSavePort',
    useClass: TermRepository,
  },
  ...TERM_QUERY_PROVIDERS,
];
