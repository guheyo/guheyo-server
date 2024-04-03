import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

export const loadYaml = (path: string, options: BufferEncoding) => () =>
  yaml.load(readFileSync(path, options)) as Record<string, any>;
