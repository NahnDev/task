import { ApiProperty } from '@nestjs/swagger';
import { StringOrObjectId } from 'src/types/StringOrObjectId';

export class CreateSubTaskDTo {
  readonly __t: 'SubTask';
  @ApiProperty()
  name: string;
  @ApiProperty({ type: 'string' })
  project: StringOrObjectId;
  @ApiProperty({ type: 'string' })
  parent: StringOrObjectId;
}
