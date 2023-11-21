import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/messages.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    this.logger.debug('Login - started');
    const user = await this.userService.getUserByLoginPassword(
      dto.login,
      dto.password,
    );

    if (user === null) {
      throw new BadRequestException(
        UserMessagesHelper.USER_LOGIN_OR_EMAIL_NOT_FOUND,
      );
    }

    const tokenPayload = { email: user.email, sub: user._id };

    return {
      email: user.email,
      name: user.name,
      token: this.jwtService.sign(tokenPayload, {
        secret: process.env.USER_JWT_SECRET_KEY,
      }),
    };
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
