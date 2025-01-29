import { Test, TestingModule } from '@nestjs/testing';
import { CleanArchitectureController } from './clean-architecture.controller';
import { CleanArchitectureService } from './clean-architecture.service';

describe('CleanArchitectureController', () => {
  let cleanArchitectureController: CleanArchitectureController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CleanArchitectureController],
      providers: [CleanArchitectureService],
    }).compile();

    cleanArchitectureController = app.get<CleanArchitectureController>(CleanArchitectureController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cleanArchitectureController.getHello()).toBe('Hello World!');
    });
  });
});
