import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const userDocument = new this.userModel(createUserDto);
    userDocument.password = await this.hashPassword(userDocument.password);
    await userDocument.save();
    return userDocument.toJSON();
  }

  async findAll() {
    const users = (await this.userModel.find({})).map((user) => user.toJSON());
    return users;
  }

  async findOne(actor: User, id: string): Promise<User> {
    try {
      return (await this.userModel.findOne({ _id: id })).toJSON();
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    await this.userModel.updateOne({ _id: id }, updateUserDto);
    return await this.findOne(null, id);
  }

  async remove(id: number) {
    await this.userModel.deleteOne({ _id: id });
  }

  async findByEmail(actor: User, email: string) {
    const userDocument = await this.userModel.findOne({ email });
    if (!userDocument) throw new Error('Not found');
    const user = userDocument.toJSON();
    return user;
  }

  async verifyPassword(id: string, password: string): Promise<boolean> {
    const userDocument = await this.userModel.findOne(
      { _id: id },
      { password: 1 },
    );
    console.log(await compare(password, userDocument.password));
    return await compare(password, userDocument.password);
  }
  async hashPassword(password: string) {
    return await hash(password, 1);
  }
}
