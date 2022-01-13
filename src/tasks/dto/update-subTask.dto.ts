import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateSubTaskDTo } from './create-subTask.dto';

export class UpdateSubTaskDto extends PartialType(
  PickType(CreateSubTaskDTo, ['name', '__t']),
) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  complete?: boolean;
}
