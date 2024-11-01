import { Test, TestingModule } from '@nestjs/testing';
import { GlobalExceptionHandlerDemoController } from './global-exception-handler-demo.controller';
import { GlobalExceptionHandlerDemoService } from './global-exception-handler-demo.service';
import { BadInputException } from '../../../libs/exception-filter/src';

describe('GlobalExceptionHandlerDemoController', () => {
  let globalExceptionHandlerDemoController: GlobalExceptionHandlerDemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GlobalExceptionHandlerDemoController],
      providers: [GlobalExceptionHandlerDemoService],
    }).compile();

    globalExceptionHandlerDemoController =
      app.get<GlobalExceptionHandlerDemoController>(
        GlobalExceptionHandlerDemoController,
      );
  });

  describe('throw error', () => {
    it('should throw error', () => {
      expect(async () => {
        globalExceptionHandlerDemoController.throwError();
      }).rejects.toThrow(BadInputException);
    });
  });
});
