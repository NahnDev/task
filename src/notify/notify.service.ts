import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { CreateNotifyEvent } from './events/create-notify.event';
import { Notify, NotifyDoc } from './schemas/notify.schema';

export const NOTIFY_ON_PAGE = 20;

@Injectable()
export class NotifyService {
  constructor(
    @InjectModel(Notify.name) private notifyModel: Model<NotifyDoc>,
    private readonly eventEmitter2: EventEmitter2,
  ) {}
  async create(createNotifyDto: CreateNotifyDto): Promise<Notify> {
    const notifyDoc = new this.notifyModel(createNotifyDto);
    await notifyDoc.save();
    const notify = notifyDoc.toJSON();
    this.eventEmitter2.emit(
      CreateNotifyEvent.ev,
      new CreateNotifyEvent(notify),
    );
    return notify;
  }

  async findAll(userId: string, page?: number): Promise<Notify[]> {
    page = page || 0;
    const notifyDocs = await this.notifyModel
      .find({ user: userId })
      .sort({ at: -1 })
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
