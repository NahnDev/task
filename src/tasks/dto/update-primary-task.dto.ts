import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { StringOrObjectId } from 'src/types/StringOrObjectId';
import { CreatePrimaryTaskDto } from './create-primary-task.dto';

export class UpdateTaskDto extends PartialType(
  OmitType(CreatePrimaryTaskDto, ['project']),
) {
  @ApiProperty()
  complete: boolean;
  @ApiProperty()
  dueDate: Date;
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  dependencies: StringOrObjectId[];
}
