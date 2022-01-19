import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { USER_ACTIVE } from 'src/enums/user-active.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './schemas/user.schema';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}
  async create(
    createUserDto: CreateUserDto,
    session?: ClientSession,
  ): Promise<User> {
    const userDoc = new this.userModel({
      ...createUserDto,
      password: await this.hashPassWd(createUserDto.password),
    });
    await userDoc.save({ session });
    return userDoc.toJSON();
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {
    const userDoc = await this.userModel.findById(id);
    return userDoc.toJSON();
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await this.userModel.findOne({ email });
    if (!userDoc) return null;
    return userDoc.toJSON();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        password: await this.hashPassWd(updateUserDto.password),
      },
    );
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.userModel.updateOne(
      { _id: id },
      { active: USER_ACTIVE.BLOCK },
    );
  }

  async activeUser(id: string) {
    return await this.userModel.updateOne(
      {
        _id: id,
      },
      { active: USER_ACTIVE.ACTIVE },
    );
    return true;
  }

  async hashPassWd(password: string): Promise<string> {
    const hashed = await hash(password, 1);
    return hashed;
  }
  async verifyPassWd(password: string, hash): Promise<boolean> {
    return await compare(password, hash);
  }
  async getPasswordByEmail(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email }, { password: 1 });
    if (!user) return null;
    return user.password;
  }
}
