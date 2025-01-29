import { Injectable } from '@nestjs/common';

@Injectable()
export class CleanArchitectureService {
  getHello(): string {
    return 'Hello World!';
  }
}
