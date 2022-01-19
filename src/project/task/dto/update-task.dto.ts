import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  @IsBoolean()
  complete?: boolean;

  @ApiProperty()
  @IsArray()
  subtask_order?: string[];

  @ApiProperty()
  @IsArray()
  dependencies?: string[];
}
