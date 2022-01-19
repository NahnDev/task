import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { PROJECT_ROLE } from 'src/roles/project.role';

export class CreateMemberDto {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PROJECT_ROLE)
  role?: PROJECT_ROLE;
}
