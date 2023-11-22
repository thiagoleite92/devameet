import { Injectable, Logger } from '@nestjs/common';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { CreateMeetDto } from './dtos/createmeet.dto';
import { generateLink } from './helpers/linkgenerator.helper';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);

  constructor(
    @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
    private readonly userService: UserService,
  ) {}

  async getMeetsByUser(userId: string) {
    this.logger.debug('getMeetsByUser - started' + userId);

    return await this.model.find({ user: userId });
  }

  async createMeet(userId: string, dto: CreateMeetDto) {
    this.logger.debug('createMeet - started' + userId);

    const user = await this.userService.getUserById(userId);

    const createMeet = new this.model({
      user: user._id,
      ...dto,
      link: generateLink(),
    });

    return await createMeet.save();
  }

  async deleteMeetByUserId(userId: string, meetId: string) {
    this.logger.debug(`deleteMeetByUserId - ${userId} - ${meetId}`);

    return await this.model.deleteOne({ user: userId, _id: meetId });
  }
}
