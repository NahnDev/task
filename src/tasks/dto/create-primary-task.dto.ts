import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreatePrimaryTaskDto {
  readonly __t: 'PrimaryTask' = 'PrimaryTask';

  @IsString()
  @ApiProperty()
  name: string;

  @IsMongoId()
  @ApiProperty({ type: 'string' })
  project: string;

  @IsString()
  @ApiProperty()
  description: string;
}
