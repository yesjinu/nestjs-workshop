import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GlobalExceptionHandlerDemoModule } from './../src/global-exception-handler-demo.module';

describe('GlobalExceptionHandlerDemoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GlobalExceptionHandlerDemoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/throw-error (GET)', async () => {
    request(app.getHttpServer())
      .get('/throw-error')
      .expect(400)
      .expect((res) => {
        expect(res.body.timestamp).toBeDefined();
        expect(res.body.path).toBe('/throw-error');
        expect(res.body.message).toBe('Your input is invalid');
        expect(res.body.code).toBe('40000');
        expect(res.body.codeName).toBe('BAD_INPUT');
        expect(res.body.traceId).toBeDefined();
      });
  });
});
