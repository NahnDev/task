import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDoc } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDoc>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    return await new this.messageModel(createMessageDto).save();
  }
  async findMany(project: string, forward?: string) {
    const forwardMessage = (
      await this.messageModel.findOne({
        project,
        _id: forward,
      })
    ).toJSON();
    return (
      await this.messageModel.find({
        project,
        ...(forward ? { at: { $lt: forwardMessage.at } } : {}),
      })
    ).map((el) => el.toJSON());
  }

  async remove(id: string) {
    this.messageModel.deleteOne({ _id: id }).then();
  }
}
