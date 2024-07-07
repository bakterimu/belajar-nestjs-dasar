import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';

@Controller('api/v1')
export class UserController {
  @Get()
  getHello() {
    return 'Hello world';
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

  @Post('sample-request')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  postBody(
    @Body() data: { name: string; age: number; address?: string },
  ): Record<string, string> {
    return {
      hello: `Halo ${data.name}, anda berumur ${data.age}`,
      address: data.address,
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
}
