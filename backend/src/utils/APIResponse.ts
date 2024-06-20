import { HttpException, HttpStatus } from '@nestjs/common';

export interface APIResponseType {
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: any;
  trace?: any;
}

export class APIException extends HttpException {
  constructor(response: APIResponseType, statusCode: HttpStatus) {
    super(response, statusCode);
  }
}
