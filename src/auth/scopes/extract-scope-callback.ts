import { Scope } from './scope.class';
import { pick } from 'lodash';
export type DataExtractScopeCallback = (data: unknown) => Scope;

export const defaultExtractScopeCallback: DataExtractScopeCallback = (data) => {
  return pick(data, Object.keys(Scope));
};
