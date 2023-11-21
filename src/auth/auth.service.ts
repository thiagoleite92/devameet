import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/messages.helper';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  login(loginDto: LoginDto) {
    this.logger.debug('Login - started');
    return loginDto;
  }

  async register(dto: RegisterDto) {
    this.logger.debug('Register - started');

    if (await this.userService.existsByEmail(dto.email)) {
      throw new BadRequestException(
        UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT,
      );
    }

    await this.userService.create(dto);
  }
}
