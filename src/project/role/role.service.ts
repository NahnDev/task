import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { ADMIN_ROLE_KEY } from 'src/constants/ADMIN_ROLE_KEY';
import { PROJECT_PERMISSION } from 'src/enums/project-permission.enum';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDoc } from './schemas/role.schema';

export const AdminRole: CreateRoleDto & { default: boolean } = {
  name: ADMIN_ROLE_KEY,
  permission: Object.keys(PROJECT_PERMISSION).map(
    (key) => PROJECT_PERMISSION[key],
  ),
  default: true,
};

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDoc>) {}
  async create(
    project: string,
    createRoleDto: CreateRoleDto,
    session?: ClientSession,
  ): Promise<Role> {
    const roleDoc = new this.roleModel({ ...createRoleDto, project });
    await roleDoc.save({ session });
    return roleDoc.toJSON();
  }

  async createInitialRole(project: string, session?: ClientSession) {
    return await this.create(project, AdminRole, session);
  }

  async findAll(project: string): Promise<Role[]> {
    return (await this.roleModel.find({ project })).map((el) => el.toJSON());
  }

  async findOne(project: string, id: string): Promise<Role | null> {
    const roleDoc = await this.roleModel.findOne({ _id: id, project });
    if (!roleDoc) return null;
    return roleDoc.toJSON();
  }

  async findByName(project: string, name: string): Promise<Role | null> {
    const roleDoc = await this.roleModel.findOne({ name, project });
    if (roleDoc) return null;
    return roleDoc.toJSON();
  }

  async update(
    project: string,
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    await this.roleModel.updateOne(
      { _id: id, project, default: false },
      updateRoleDto,
    );
    return await this.findOne(project, id);
  }

  async remove(project, id: string) {
    await this.roleModel.deleteOne({ project, _id: id, default: false });
  }

  async removeAll(project: string) {
    await this.roleModel.deleteMany({ project });
  }

  public async hasRole(project: string, id: string): Promise<boolean> {
    if (!id) return true;
    if (await this.roleModel.findOne({ project, _id: id })) {
      return true;
    }
    return false;
  }
}
