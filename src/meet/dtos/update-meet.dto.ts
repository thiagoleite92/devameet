import { Type } from 'class-transformer';
import { MeetMessagesHelper } from '../helpers/meet-messages.helper';
import { CreateMeetDto } from './create-meet.dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdateMeetDto extends CreateMeetDto {
  @IsArray({ message: MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID })
  @Type(() => UpdateMeetObjectDto)
  @ValidateNested({ each: true })
  objects: Array<UpdateMeetObjectDto>;
}

export class UpdateMeetObjectDto {
  @IsNotEmpty({ message: MeetMessagesHelper.UPDATE_OBJECT_NAME_NOT_VALID })
  name: string;

  @Min(0, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  @Max(8, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  x: number;

  @Min(0, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  @Max(8, { message: MeetMessagesHelper.UPDATE_XY_NOT_VALID })
  y: number;

  @Min(0, { message: MeetMessagesHelper.UPDATE_ZINDEX_NOT_VALID })
  zIndex: number;

  @IsString({ message: MeetMessagesHelper.UPDATE_ORIENTATION_NOT_VALID })
  orientation: string;
}
