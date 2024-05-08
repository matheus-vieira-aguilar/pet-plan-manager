import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { InfraModule } from 'src/infra/infra.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InfraModule,
    PassportModule,
    JwtModule.register({
      secret: 'DO_NOT_KEEP_THIS_VALUE_HERE',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
