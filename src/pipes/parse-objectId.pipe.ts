import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { StringOrObjectId } from 'src/types/StringOrObjectId';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, string> {
  transform(value: string): string {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
