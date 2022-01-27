import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { DataExtractScopeCallback } from 'src/auth/scopes/extract-scope-callback';

export const EXTRACT_DATA_KEY = 'extract_data_handler';
export const ExtractScope = (cb: DataExtractScopeCallback) =>
  SetMetadata(EXTRACT_DATA_KEY, cb);
