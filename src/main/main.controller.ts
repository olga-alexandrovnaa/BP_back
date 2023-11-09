import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';

@ApiTags('Пользователи')
@Controller('api')
export class MainController {
  constructor(private readonly mainService: MainService) { }


  // @Get('test')
  // async test() {
  //   return await this.mainService.test();
  // }

  //*** выполнить побочный запрос действия

  //запустить процесс по id шаблона и id продукта (создать процесс и активные действия) вернуть id процесса
  @Post('start')
  async start(
    @Query('shablonId') shablonId: number,
    @Query('productId') productId: number,
    @Query('userId') userId: number,
  ) {
    return await this.mainService.start(shablonId, productId, userId);
  }

  //получить текущие активные и выполненные действия по процессу
  //(id, кто может вып., кто выполнил, поля со знач и id, запросы и список полей небходимых, выполнено ли )
  @Get(':id')
  async getDayTasks(@Param('id') id: number) {
    return await this.mainService.getDayTasks(id);
  }

  //заполнить поля в действии передать id и значение
  @Post('action-input')
  async setActionInput(@Query('actionIFVId') actionIFVId: number, @Query('value') value: string) {
    return await this.mainService.setActionInput(actionIFVId, value);
  }

  //выполнить действие (расчет новых активных) передать id
  @Post('action-checked')
  async setActionChecked(@Query('actionId') actionId: number, @Query('userId') userId: number) {
    return await this.mainService.setActionChecked(actionId, userId);
  }
}
