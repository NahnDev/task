import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';
import { PROJECT_ROLE } from 'src/roles/project.role';

export class UpdateMemberDto {
  @ApiProperty()
  @IsEnum(PROJECT_ROLE)
  role: PROJECT_ROLE;
}
