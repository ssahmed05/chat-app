import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class UnknownExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;
    const errorResponse = {
      status: 'error',
      message: this.buildValidationErrorMessage(exception),
    };

    response.status(status).json(errorResponse);
  }

  private buildValidationErrorMessage(exception: ValidationError): string {
    const errorMessage = [];
    for (const key in exception.constraints) {
      if (exception.constraints.hasOwnProperty(key)) {
        errorMessage.push(exception.constraints[key]);
      }
    }
    return errorMessage.join('; ');
  }
}
