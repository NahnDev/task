import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @ApiProperty()
  @IsArray()
  subtask_order?: string[];

  @IsOptional()
  @ApiProperty()
  @IsArray()
  dependencies?: string[];
}
