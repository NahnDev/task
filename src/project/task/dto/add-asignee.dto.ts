import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AddAssigneeDto {
  @ApiProperty()
  @IsMongoId()
  user: string;
}
