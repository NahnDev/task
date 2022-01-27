import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Query, startSession } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MemberService } from './member/member.service';
import { Project, ProjectDoc } from './schemas/project.schema';
import { RoleService } from 'src/project/role/role.service';
import { TaskService } from './task/task.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDoc>,
    @InjectConnection() private connection: Connection,
    private memberService: MemberService,
    private roleService: RoleService,
    private taskService: TaskService,
  ) {}

  async create(
    actor: User,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    console.log('here');
    const session = await this.connection.startSession();
    console.log('here');

    const projectDoc = new this.projectModel({
      ...createProjectDto,
      author: actor._id,
    });
    await projectDoc.save({ session });
    console.log('here');
    // tao role Admin
    const roleDoc = await this.roleService.createInitialRole(
      projectDoc._id,
      session,
    );
    console.log('here');
    // them nguoi dung admin
    await this.memberService.create(
      projectDoc._id,
      {
        user: projectDoc.author,
        role: roleDoc._id,
      },
      session,
    );

    console.log('work');
    session.endSession();
    return projectDoc.toJSON();
  }

  async findAllByUser(user: string): Promise<Project[]> {
    // tim danh sach project tu member module
    const projectIds: string[] = (
      await this.memberService.findProjectHasUser(user)
    ).map((projectMember) => projectMember.project);
    // lay thong tin chi tiet project
    const projectDocs = await this.projectModel.find({
      _id: { $in: projectIds },
    });
    return projectDocs.map((projectDoc) => projectDoc.toJSON());
  }

  async findOne(id: string): Promise<Project> {
    return (await this.projectModel.findById(id)).toJSON();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.projectModel.updateOne({ _id: id }, updateProjectDto);
    return await this.findOne(id);
  }

  remove(id: string) {
    this.taskService.removeAll(id).then();
    this.roleService.removeAll(id).then();
    this.memberService.removeAll(id).then();
    return this.projectModel.deleteOne({ _id: id });
  }
}
