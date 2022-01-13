import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateSubTaskDTo {
  readonly __t: 'SubTask' = 'SubTask';

  @IsString()
  @ApiProperty()
  name: string;

  @IsMongoId()
  @ApiProperty({ type: 'string' })
  project: string;

  @IsMongoId()
  @ApiProperty({ type: 'string' })
  parent: string;
}
