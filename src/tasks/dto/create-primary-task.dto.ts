import { ApiProperty } from '@nestjs/swagger';
import { StringOrObjectId } from '../../types/StringOrObjectId';

export class CreatePrimaryTaskDto {
  readonly __t: 'PrimaryTask';
  @ApiProperty()
  name: string;
  @ApiProperty({ type: 'string' })
  project: StringOrObjectId;
  @ApiProperty()
  description: string;
}
