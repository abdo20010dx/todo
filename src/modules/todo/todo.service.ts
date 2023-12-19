import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import { Model, ObjectId } from 'mongoose';
import { ApiResponse } from 'src/utils/api-response/api-response';
import { calculatePagination } from 'src/utils/pagination/globalFilters';
import { findDto } from 'src/utils/dto/findDto';
import { FindTodoDto } from './dto/findTodoDto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) { }

  async create(createTodoDto: CreateTodoDto) {
    const createdTodo = new this.todoModel(createTodoDto);
    const record = await createdTodo.save();
    return ApiResponse.successResponse("ar", "CREATE", "CREATED", record)
  }

  async findAll(query: FindTodoDto) {
    let { page, limit, search = '', withDeleted = false, order = { id: 'DESC' }, orderKey, orderValue, ...filter } = query;
    let current_page = page
    let pagination = { take: +limit, skip: (current_page - 1) * +limit };
    const total = await this.todoModel.countDocuments({ userId: query.userId }).exec();
    const records = await this.todoModel.find({ userId: query.userId }).limit(limit).skip(pagination["skip"]).exec();
    let meta = calculatePagination(limit, total, current_page);
    return ApiResponse.findWithMeta("ar", "success", "OK", meta, records);
  }

  async findOne(id: ObjectId) {
    const record = await this.todoModel.findById(id).exec();
    if (!record) return ApiResponse.notFoundResponse("ar", "NOTFOUND");
    return ApiResponse.successResponse("ar", "success", "OK", record)

  }

  async update(_id: ObjectId, updateTodoDto: UpdateTodoDto) {
    await this.findOne(_id)
    await this.todoModel.updateOne({ _id }, updateTodoDto).exec();
    return await this.findOne(_id)
  }

  async remove(_id: ObjectId) {
    await this.findOne(_id)
    const deletedRecord = await this.todoModel.deleteOne({ _id }).exec();
    return ApiResponse.successResponse("ar", "DELETE", "OK")
  }
}
