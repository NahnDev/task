import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateMessageEvent } from './events/create-message.event';
import { Message, MessageDoc } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDoc>,
    private readonly eventEmitter2: EventEmitter2,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    console.log(`Start create a new message`);

    const messageDoc = new this.messageModel(createMessageDto);
    await messageDoc.save();
    const message = messageDoc.toJSON();
    this.eventEmitter2.emit(
      CreateMessageEvent.ev,
      new CreateMessageEvent(message),
    );
    console.log(`End create a new message`);
    return message;
  }

  async findMany(project: string, forward?: string) {
    const forwardMessage = forward
      ? (
          await this.messageModel.findOne({
            room: project,
            _id: forward,
          })
        ).toJSON()
      : null;
    return (
      await this.messageModel
        .find({
          room: project,
          ...(forward ? { at: { $lt: forwardMessage.at } } : {}),
        })
        .sort({ at: -1 })
        .limit(20)
    ).map((el) => el.toJSON());
  }
  async findLast(rId: string): Promise<Message> {
    const messageDoc = (
      await this.messageModel.find({ room: rId }).sort({ at: -1 }).limit(1)
    )[0];
    if (!messageDoc) return null;
    const message = messageDoc.toJSON();
    return message;
  }

  async remove(id: string) {
    this.messageModel.deleteOne({ _id: id }).then();
  }
}
