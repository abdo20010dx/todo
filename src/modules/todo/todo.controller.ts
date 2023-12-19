import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { findDto } from 'src/utils/dto/findDto';
import { FindTodoDto } from './dto/findTodoDto';
import { Request } from 'express';
import { ObjectId } from 'mongoose';

@ApiTags("todo")
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    createTodoDto.userId = req["user"]._id
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query() query: FindTodoDto, @Req() req: Request) {
    query.userId = req["user"]["_id"];
    return this.todoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }


  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.todoService.remove(id);
  }
}
