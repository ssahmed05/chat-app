import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    let errorMessage = 'An error occurred with the database query.';

    // Handle known Prisma error codes
    if (exception.code === 'P2002' && exception.meta?.target) {
      const target = exception.meta.target as string[];
      // P2002 error code means Unique constraint failed
      if (target.includes('email')) {
        errorMessage = 'A user with this email already exists.';
      }
    }

    const errorResponse = {
      status: 'error',
      message: errorMessage,
      trace: exception.meta,
    };

    response.status(status).json(errorResponse);
  }
}
