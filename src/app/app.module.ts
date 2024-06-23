import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GeminiModule } from 'src/gemini/gemini.module';
import { GeminiController } from 'src/gemini/gemini.controller';
import { GeminiService } from 'src/gemini/gemini.service';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PreferencesEntity } from './preferences/preferences.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [UsersEntity, PreferencesEntity],
      synchronize: true,
    } as TypeOrmModuleOptions),
    PreferencesModule,
    UsersModule,
    GeminiModule,
    AuthModule,
  ],
  controllers: [AppController, GeminiController],
  providers: [AppService, GeminiService],
  exports: [GeminiService],
})
export class AppModule {}
