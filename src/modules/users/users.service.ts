import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { findDto } from 'src/utils/dto/findDto';
import { calculatePagination } from 'src/utils/pagination/globalFilters';
import { ApiResponse } from 'src/utils/api-response/api-response';
import { SigninDto } from '../auth/dto/signinDto';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(REQUEST) private request: Request,
    private jwtService: JwtService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const record = await createdUser.save();
    return ApiResponse.successResponse("ar", "CREATE", "CREATED", record)
  }

  async findAll(query: findDto) {
    let { page, limit, search = '', withDeleted = false, order = { id: 'DESC' }, orderKey, orderValue, ...filter } = query;
    let current_page = page
    let pagination = { take: +limit, skip: (current_page - 1) * +limit };
    const total = await this.userModel.countDocuments({}).exec();
    const records = await this.userModel.find().limit(limit).skip(pagination["skip"]).exec();
    let meta = calculatePagination(limit, total, current_page);
    return ApiResponse.findWithMeta("ar", "success", "OK", meta, records);
  }

  async findOne(id: number) {
    const record = await this.userModel.findById(id).exec();
    if (!record) return ApiResponse.notFoundResponse("ar", "NOTFOUND");
    return ApiResponse.successResponse("ar", "success", "OK", record)

  }

  async update(_id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(_id)
    await this.userModel.updateOne({ _id }, updateUserDto).exec();
    return await this.findOne(_id)
  }

  async remove(_id: number) {
    await this.findOne(_id)
    const deletedRecord = await this.userModel.deleteOne({ _id }).exec();
    return ApiResponse.successResponse("ar", "DELETE", "OK")
  }

  async signup(createUserDto: CreateUserDto) {
    if ((await this.userModel.findOne({ email: createUserDto.email }))) {
      ApiResponse.errorThrowResponse("ar", "DUPLICATED", "CONFLICT", "/signup", { "{value}": createUserDto.email })
    }
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword
    const createdUser = await this.create(createUserDto);
    return createdUser

  }

  async singIn(signinDto: SigninDto) {

    const user = (await this.userModel.findOne({ email: signinDto.email }).exec())?.toJSON();
    if (!user) ApiResponse.errorThrowResponse("ar", "NOTFOUND", "NOT_FOUND", "/singin", { "{value}": signinDto.email })
    const isMatch = await bcrypt.compare(signinDto.password, user.password);
    if (!isMatch) ApiResponse.errorThrowResponse("ar", "UNAUTHORIZED", "UNAUTHORIZED", "/signin")
    const token = this.jwtService.sign(user)

    const data = {
      Authorization: "Bearer " + token,
      ...user
    };
    return ApiResponse.successResponse("ar", "signinSuccess", "OK", data)
  }


}
