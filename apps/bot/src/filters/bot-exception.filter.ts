import { ArgumentsHost, Catch } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class BotExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    return super.catch(exception, host);
  }
}
