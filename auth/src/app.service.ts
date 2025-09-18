import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async register(dto: RegisterDto): Promise<Omit<IUser, 'password'>> {
    try {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const createdUser = new this.userModel({
        ...dto,
        password: hashedPassword,
      });

      const savedUser = await createdUser.save();

      const { password, ...userWithoutPassword } = savedUser.toObject();
      return userWithoutPassword;
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(dto: LoginDto): Promise<Omit<IUser, 'password'>> {
    try {
      const user = await this.userModel
        .findOne({ email: dto.email })
        .select('+password');
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new InternalServerErrorException('Failed to login');
    }
  }
}
