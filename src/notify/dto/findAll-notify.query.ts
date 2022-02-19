import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindAllNotifyQuery {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;
}
