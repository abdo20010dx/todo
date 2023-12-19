import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { TodoModule } from './modules/todo/todo.module';
import { dbConfig } from './database/dbConfig';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.gaurd';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.uri),
    UsersModule, TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // global middleware of AuthGuard
    },
  ],
})
export class AppModule { }
