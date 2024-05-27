import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsModule } from './positions/positions.module';
import { AuthModule } from './auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [
    UserModule,
    PositionsModule,
    AuthModule,
    NestjsFormDataModule,
    GenerationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // type: 'postgres',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),

        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
