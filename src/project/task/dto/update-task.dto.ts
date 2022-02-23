import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TASK_STATUS } from 'src/enums/task_status';
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

  @IsOptional()
  @ApiProperty()
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  expires: number;
}
