import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { MainModule } from './main/main.module';

@Module({
  controllers: [AppController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }, AppService],
  imports: [MainModule],
  exports: [AppService],
})
export class AppModule { }
