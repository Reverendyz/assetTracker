import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ExceptionEnum } from 'src/utils/main.utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    const pwMatch = await argon.verify(user.hash, dto.password);

    if (!user || !pwMatch) {
      throw new ForbiddenException(ExceptionEnum.INVALID_CREDENTIALS);
    }

    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      algorithm: 'HS256',
      secret: secret,
      expiresIn: '15m',
    });

    return {
      access_token: token,
    };
  }
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const date = new Date(dto.birth);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          birth: date,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(ExceptionEnum.USER_ALREADY_CREATED);
        }
      }
      throw error;
    }
  }
  async logout(req: Request) {
    // TODO
    return req;
  }
  async validateToken(req: Request): Promise<boolean> {
    try {
      const { authorization } = req.headers;
      const [, token] = authorization.split(' ');
      await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
