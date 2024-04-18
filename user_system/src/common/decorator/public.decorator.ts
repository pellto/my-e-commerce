import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'fLbGCgDy4WRhnFXvoajFZ1eExe9SQKNj';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
