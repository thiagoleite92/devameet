import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class LoginDto {
  @IsEmail({}, { message: MessagesHelper.AUTH_LOGIN_NOT_VALID })
  login: string;

  @IsNotEmpty({ message: MessagesHelper.AUTH_PASSOWORD_NOT_VALID })
  password: string;
}
