import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

@Controller('api/v1')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly connection: Connection,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
    private readonly memberService: MemberService,
  ) {}

  @Get('view/hello')
  getViewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      name: name,
      title: 'Template Engine',
    });
  }

  @Get('hello')
  async getHello(@Query('name') name: string) {
    return this.userService.sayHello(name);
  }

  @Get('send')
  async getSend() {
    const member = this.memberService.sendEmail();
    console.log(member);
    this.userRepository.save();
    this.mailService.sendMail();
    return this.connection.send();
  }

  @Get('hello/:length')
  getHelloParamAndQuery(
    @Param('length') length: number,
    @Query('name') name: string,
  ): string[] {
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
      result.push(name);
    }
    return result;
  }

  // @Post('sample-request')
  // @Header('Content-Type', 'application/json')
  // @HttpCode(200)
  // postBody(@Req() request: Request): Record<string, string> {
  //   const res = request.body;
  //   return {
  //     hello: `Halo ${res.name}, anda berumur ${res.age}`,
  //     address: res.address,
  //   };
  // }

  @Post('sample-request')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  postBody(@Req() request: Request): Record<string, string> {
    const res = request.body;
    return {
      hello: `Halo ${res.name}, anda berumur ${res.age}`,
      address: res.address,
    };
  }

  @Get('redirect')
  @Redirect()
  getRedirect(): HttpRedirectResponse {
    return {
      url: '/api/v1/sample-redirect',
      statusCode: 301,
    };
  }

  @Get('sample-redirect')
  getResultRedirect(): string {
    return 'Sudah pindah dari redirect';
  }

  @Get('set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('success set cookie');
  }

  @Get('get-cookie')
  getCookie(@Req() req: Request) {
    const nama = req.cookies['name'];
    return `Hello ${nama}`;
  }
}
