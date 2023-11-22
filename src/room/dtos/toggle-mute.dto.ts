import { IsBoolean } from 'class-validator';
import { RoomMessagesHelper } from '../helpers/room-messages.helper';
import { JoinRoomDto } from './join-room.dto';

export class ToggleMuteDto extends JoinRoomDto {
  @IsBoolean({ message: RoomMessagesHelper.MUTE_NOT_VALID })
  muted: boolean;
}
