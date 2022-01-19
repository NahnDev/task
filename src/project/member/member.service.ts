import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {
  ProjectMember,
  ProjectMemberDoc,
} from './schemas/project-member.schema';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectModel(ProjectMember.name)
    private memberModel: Model<ProjectMemberDoc>,
  ) {}

  async create(
    project: string,
    createMemberDto: CreateMemberDto,
  ): Promise<ProjectMember> {
    console.log(createMemberDto);
    const memberDoc = new this.memberModel({ ...createMemberDto, project });
    await memberDoc.save();
    return memberDoc.toJSON();
  }
  async findAll(project: string): Promise<ProjectMember[]> {
    return (await this.memberModel.find({ project })).map((memberDoc) =>
      memberDoc.toJSON(),
    );
  }

  async findOne(project: string, user: string): Promise<ProjectMember> {
    return await this.memberModel.findOne({ user, project });
  }

  async updateOne(
    project: string,
    user: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<ProjectMember> {
    await this.memberModel.updateOne(
      { user: user, project: project },
      updateMemberDto,
    );
    return await this.findOne(user, project);
  }

  async removeOne(project: string, user: string) {
    await this.memberModel.remove({ user, project });
  }

  async findByUser(user: string): Promise<ProjectMember[]> {
    return (await this.memberModel.find({ user })).map((memberDoc) =>
      memberDoc.toJSON(),
    );
  }
}
