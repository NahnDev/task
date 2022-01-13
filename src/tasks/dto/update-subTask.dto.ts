import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateSubTaskDTo } from './create-subTask.dto';

export class UpdateSubTaskDto extends PartialType(
  PickType(CreateSubTaskDTo, ['name', '__t']),
) {
  @ApiProperty()
  complete: boolean;
}
