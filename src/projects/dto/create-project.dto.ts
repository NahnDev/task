import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { PROJECT_ROLE } from '../enums/project-role.enum';
import { project_permission_open_api_options } from '../schemas/project.schema';

export class CreateProjectDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  author: string;
  @ApiProperty(project_permission_open_api_options)
  permission: [
    {
      user: string;
      role: PROJECT_ROLE;
    },
  ];
}
