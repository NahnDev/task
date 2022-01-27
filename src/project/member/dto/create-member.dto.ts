import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  role?: string;
}
