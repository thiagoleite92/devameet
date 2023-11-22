import { BadRequestException, Injectable, Logger, Put } from '@nestjs/common';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { CreateMeetDto } from './dtos/create-meet.dto';
import { generateLink } from './helpers/link-generator.helper';
import { MeetObject, MeetObjectDocument } from './schemas/meet-object.schema';
import { UpdateMeetDto } from './dtos/update-meet.dto';
import { MeetMessagesHelper } from './helpers/meet-messages.helper';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);

  constructor(
    @InjectModel(Meet.name) private readonly meetModel: Model<MeetDocument>,
    @InjectModel(MeetObject.name)
    private readonly objectModel: Model<MeetObjectDocument>,
    private readonly userService: UserService,
  ) {}

  async getMeetsByUser(userId: string) {
    this.logger.debug('getMeetsByUser - started' + userId);

    return await this.meetModel.find({ user: userId });
  }

  async createMeet(userId: string, dto: CreateMeetDto) {
    this.logger.debug('createMeet - started' + userId);

    const user = await this.userService.getUserById(userId);

    const createMeet = new this.meetModel({
      user: user._id,
      ...dto,
      link: generateLink(),
    });

    return await createMeet.save();
  }

  async deleteMeetByUserId(userId: string, meetId: string) {
    this.logger.debug(`deleteMeetByUserId - ${userId} - ${meetId}`);

    return await this.meetModel.deleteOne({ user: userId, _id: meetId });
  }

  async getMeetObjects(meetId: string, userId: string) {
    this.logger.debug(`getMeetsObjects - ${userId} - ${meetId}`);

    const user = await this.userService.getUserById(userId);

    const meet = await this.meetModel.findOne({ user, _id: meetId });

    return await this.objectModel.find({ meet });
  }

  @Put('')
  async update(meetId: string, userId: string, dto: UpdateMeetDto) {
    this.logger.debug(`updateMeet - ${userId} - ${meetId}`);

    const user = await this.userService.getUserById(userId);

    const meet = await this.meetModel.findOne({ user, _id: meetId });

    if (!meet) {
      throw new BadRequestException(MeetMessagesHelper.UPDATE_MEET_NOT_FOUND);
    }

    meet.name = dto.name;
    meet.color = dto.color;

    await this.meetModel.findByIdAndUpdate(meetId, meet);

    await this.objectModel.deleteMany({ meet });

    let objectPayload;

    for (const object of dto.objects) {
      objectPayload = {
        meet,
        ...object,
      };

      await this.objectModel.create(objectPayload);
    }
  }
}
