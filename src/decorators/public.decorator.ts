import { SetMetadata } from '@nestjs/common';

export const PUBLIC_API_KEY = 'IS_PUBLIC_API';
export const PublicAPI = () => SetMetadata(PUBLIC_API_KEY, true);
