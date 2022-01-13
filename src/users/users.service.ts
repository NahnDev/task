import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { compare, hash } from 'bcryptjs';
import { StringOrObjectId } from 'src/types/StringOrObjectId';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const userDocument = new this.userModel(createUserDto);
    await userDocument.save();
    return userDocument.toJSON();
  }

  async findAll() {
    const users = (await this.userModel.find({})).map((user) => user.toJSON());
    return users;
  }

  async findOne(actor: User, id: StringOrObjectId): Promise<User> {
    return (await this.userModel.findById(id)).toJSON();
  }

  async update(id: StringOrObjectId, updateUserDto: UpdateUserDto) {
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

  async verifyPassword(
    id: StringOrObjectId,
    password: string,
  ): Promise<boolean> {
    const userDocument = (
      await this.userModel.findById(id, { password: 1 })
    ).toJSON();
    return await compare(password, userDocument.password);
  }
}
