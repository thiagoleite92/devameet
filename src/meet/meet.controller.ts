import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { MeetService } from './meet.service';
import { GetMeetDto } from './dtos/get-meet.dto';
import { CreateMeetDto } from './dtos/create-meet.dto';
import { UpdateMeetDto } from './dtos/update-meet.dto';

@Controller('meet')
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Get('')
  async getMeet(@Request() req) {
    const { userId } = req?.user;

    const result = await this.meetService.getMeetsByUser(userId);

    return result.map(
      (meet) =>
        ({
          id: meet._id.toString(),
          name: meet.name,
          color: meet.color,
          link: meet.link,
        }) as GetMeetDto,
    );
  }

  @Post()
  async createMeet(@Request() req, @Body() dto: CreateMeetDto) {
    const { userId } = req?.user;

    await this.meetService.createMeet(userId, dto);
  }

  @Delete(':meetId')
  async deleteMeet(@Request() req, @Param() params) {
    const { userId } = req?.user;

    const { meetId } = params;

    await this.meetService.deleteMeetByUserId(userId, meetId);
  }

  @Get('object/:meetId')
  async getObjectsByMeetId(@Request() req, @Param() params) {
    const { userId } = req?.user;

    const { meetId } = params;

    return await this.meetService.getMeetObjects(meetId, userId);
  }

  @Put(':meetId')
  async updateMeet(
    @Request() req,
    @Param() params,
    @Body() dto: UpdateMeetDto,
  ) {
    const { userId } = req?.user;

    const { meetId } = params;

    await this.meetService.update(meetId, userId, dto);
  }
}
