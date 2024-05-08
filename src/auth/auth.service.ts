import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import UserRepository from 'src/infra/repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.userRepository.findOneBy({ username });

    if (!findUser || !password) {
      throw new UnauthorizedException();
    }

    if (this.matchPassword(password, findUser.password)) {
      const payload = {
        _id: findUser._id,
        username: findUser.username,
        email: findUser.email,
        roles: findUser.roles,
      };

      return this.jwtService.sign(payload);
    }
  }

  private matchPassword(givenPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(givenPassword, userPassword);
  }
}
