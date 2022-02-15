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
import { extend } from 'lodash';
import { Member } from './member/schemas/member.schema';

@Injectable()
class OldProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDoc>,
    @InjectConnection() private connection: Connection,
    protected memberService: MemberService,
    protected roleService: RoleService,
    protected taskService: TaskService,
  ) {}

  async create(
    actor: User,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const session = await this.connection.startSession();
    const projectDoc = new this.projectModel({
      ...createProjectDto,
      author: actor._id,
    });
    await projectDoc.save({ session });
    // tao role Admin
    const roleDoc = await this.roleService.createInitialRole(
      projectDoc._id,
      session,
    );
    await this.memberService.create(
      projectDoc._id,
      {
        user: projectDoc.author,
        role: roleDoc._id,
      },
      session,
    );

    session.endSession();
    return projectDoc.toJSON();
  }

  async findAllByUser(user: string): Promise<Project[]> {
    // tim danh sach project tu member module
    const projectIds: string[] = (
      await this.memberService.findWithUser(user)
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

export class ProjectService extends OldProjectService {
  async findAllByUser(user: string): Promise<Project[]> {
    const projects = (await super.findAllByUser(user)) as Project[];
    for (const project of projects) {
      project.members = await this.memberService.findAll(project._id);
    }
    return projects;
  }

  async findOne(id: string): Promise<Project> {
    const project = (await super.findOne(id)) as Project;
    project.members = await this.memberService.findAll(project._id);
    return project;
  }
}
