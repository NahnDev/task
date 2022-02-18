import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { MemberService } from 'src/project/member/member.service';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/schemas/project.schema';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    private readonly memberService: MemberService,
    private readonly projectService: ProjectService,
    private readonly messageService: MessageService,
  ) {}
  async findAll(userId: string) {
    const projects: Project[] = await this.projectService.findAllByUser(userId);
    const rooms: Room[] = [];
    for (const project of projects) {
      const room: Room = new Room();
      room._id = project._id;
      room.name = project.name;
      room.at = project.at;
      room.lastMessage = await this.messageService.findLast(room._id);
      rooms.push(room);
    }

    return rooms.sort((a, b) => {
      const aAt = a.lastMessage?.at || a.at;
      const bAt = b.lastMessage?.at || b.at;
      return bAt - aAt;
    });
  }
  remove(id: number) {
    // this service will delete all message
  }
}
