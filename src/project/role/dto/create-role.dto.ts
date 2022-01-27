import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { PROJECT_PERMISSION } from 'src/enums/project-permission.enum';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(PROJECT_PERMISSION, { each: true })
  permission: PROJECT_PERMISSION[];
}
