import { IsString, IsEnum } from 'class-validator';

export class CreateFileDto {
  @IsString()
  path: string;

  @IsString()
  name: string;

  @IsString()
  mineType: string;

  @IsString()
  project: string;

  @IsString()
  task?: string;
}
