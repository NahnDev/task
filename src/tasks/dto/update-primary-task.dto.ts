import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { CreatePrimaryTaskDto } from './create-primary-task.dto';

export class UpdateTaskDto extends PartialType(
  OmitType(CreatePrimaryTaskDto, ['project']),
) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  complete?: boolean;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  dueDate?: Date;
}
