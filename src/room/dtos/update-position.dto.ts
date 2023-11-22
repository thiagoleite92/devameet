import { IsString, Max, Min } from 'class-validator';
import { JoinRoomDto } from './join-room.dto';
import { MeetMessagesHelper } from 'src/meet/helpers/meet-messages.helper';

export class UpdateUserPositionDto extends JoinRoomDto {
  @Min(0, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  @Max(8, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  x: number;

  @Min(0, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  @Max(8, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  y: number;

  @IsString({ message: MeetMessagesHelper.UPDATE_ORIENTATION_NOT_VALID })
  orientation: number;
}
