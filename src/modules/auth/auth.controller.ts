import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Public } from 'src/utils/decorators/public.decorator';
import { SigninDto } from './dto/signinDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,

  ) { }
  @Public()
  @Post('/signin')
  signin(@Body() signinDto: SigninDto, @Req() req: any) {
    return this.usersService.singIn(signinDto);
  }

  @Public()
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    const signinDto = { email: createUserDto.email, password: createUserDto.password }
    const user = this.usersService.signup(createUserDto);
    return user
  }
}
