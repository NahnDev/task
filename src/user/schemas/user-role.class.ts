import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/project/role/schemas/role.schema';

export class UserRole {
  @ApiProperty()
  system: string;

  @ApiProperty()
  project: Role;
}
