import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ArrayContains, IsArray, IsMongoId, IsString } from 'class-validator';
import { PROJECT_ROLE } from '../enums/project-role.enum';
import { project_permission_open_api_options } from '../schemas/project.schema';

export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsMongoId()
  author: string;

  @IsArray()
  @ApiProperty(project_permission_open_api_options)
  permission: [
    {
      user: string;
      role: PROJECT_ROLE;
    },
  ];
}
