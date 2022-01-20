import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { Notify, NotifyDoc } from './schemas/notify.schema';

export const NOTIFY_ON_PAGE = 20;

@Injectable()
export class NotifyService {
  constructor(
    @InjectModel(Notify.name) private notifyModel: Model<NotifyDoc>,
  ) {}
  async create(createNotifyDto: CreateNotifyDto): Promise<Notify> {
    const notifyDoc = new this.notifyModel(createNotifyDto);
    await notifyDoc.save();
    return notifyDoc.toJSON();
  }

  async findAll(userId: string, page?: number): Promise<Notify[]> {
    page = page || 0;
    const notifyDocs = await this.notifyModel
      .find({ user: userId })
      .skip(NOTIFY_ON_PAGE * page)
      .limit(NOTIFY_ON_PAGE);
    return notifyDocs.map((notifyDoc) => notifyDoc.toJSON());
  }

  async findOne(id: string): Promise<Notify | null> {
    const notifyDoc = await this.notifyModel.findById(id);
    if (!notifyDoc) return null;
    return notifyDoc.toJSON();
  }

  async remove(id: string) {
    await this.notifyModel.deleteOne({ _id: id });
  }

  async removeAll(user: string) {
    await this.notifyModel.deleteMany({ user: user });
  }
}
