import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { ADMIN_ROLE_KEY } from 'src/constants/ADMIN_ROLE_KEY';
import { AdminRole, RoleService } from 'src/project/role/role.service';
import { User } from 'src/user/schemas/user.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberCreatedEvent } from './events/member-created.event';
import { Member, MemberDoc } from './schemas/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDoc>,
    private roleService: RoleService,
    private readonly eventEmitter2: EventEmitter2,
  ) {}

  async create(
    project: string,
    createMemberDto: CreateMemberDto,
    session?: ClientSession,
    actor?: User,
  ): Promise<Member> {
    if (!(await this.roleService.hasRole(project, createMemberDto.role)))
      throw new Error('not found role');
    const memberDoc = new this.memberModel({ ...createMemberDto, project });
    await memberDoc.save({ session });
    this.eventEmitter2.emit(
      MemberCreatedEvent.ev,
      new MemberCreatedEvent({
        mId: memberDoc._id.toHexString(),
        actor: actor?._id,
      }),
    );
    return await this.findOne(project, memberDoc.user._id);
  }

  async findAll(project: string): Promise<Member[]> {
    return (await this.memberModel.find({ project })).map((memberDoc) =>
      memberDoc.toJSON(),
    );
  }

  async findOne(project: string, user: string): Promise<Member> {
    const member = await this.memberModel.findOne({ user, project });
    return member ? member.toJSON() : null;
  }
  async findById(mId: string) {
    const member = await this.memberModel.findById(mId);
    return member.toJSON();
  }

  async updateOne(
    project: string,
    user: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    if (!(await this.roleService.hasRole(project, updateMemberDto.role)))
      throw new Error('not found role');
    await this.memberModel.updateOne(
      { user: user, project: project },
      updateMemberDto,
    );
    return await this.findOne(user, project);
  }

  async remove(project: string, user: string) {
    await this.memberModel.remove({ user, project });
  }

  async removeAll(project: string) {
    await this.memberModel.deleteMany({ project });
  }

  async findWithUser(user: string): Promise<Member[]> {
    return (await this.memberModel.find({ user })).map((memberDoc) =>
      memberDoc.toJSON(),
    );
  }
}
