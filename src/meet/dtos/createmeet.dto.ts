import { IsHexadecimal, MinLength } from 'class-validator';
import { MeetMessagesHelper } from '../helpers/meetmessages.helper';

export class CreateMeetDto {
  @MinLength(2, { message: MeetMessagesHelper.CREATE_NAME_NOT_VALID })
  name: string;

  @IsHexadecimal({ message: MeetMessagesHelper.CREATE_COLOR_NOT_VALID })
  color: string;
}
