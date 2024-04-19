import { camelCase, upperFirst } from 'lodash';

export const toPascalCase = (text: string) => upperFirst(camelCase(text));
