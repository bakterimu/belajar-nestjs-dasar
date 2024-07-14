import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be same result', () => {
    const result = ['izhar', 'izhar'];
    expect(controller.getHelloParamAndQuery(2, 'izhar')).toEqual(result);
  });

  it('should return view response', () => {
    const response = httpMock.createResponse();
    controller.getViewHello('izhar', response);
    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'izhar',
      title: 'Template Engine',
    });
  });

  it('should success with request object', () => {
    const request = httpMock.createRequest();
    request._setBody({
      name: 'izhar',
      age: 17,
      address: 'jl ayani',
    });

    expect(controller.postBody(request)).toEqual({
      hello: 'Halo izhar, anda berumur 17',
      address: 'jl ayani',
    });
  });
});
