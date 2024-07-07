import {catchError, tap, throwError} from "rxjs";
import {HttpErrorResponse, HttpEventType, HttpInterceptorFn} from '@angular/common/http';
import {LoggingService} from "../services/logging/logging.service";

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(tap(event => {
    const logging = new LoggingService();
    if (event.type === HttpEventType.Response) {
      logging.info(req.url, 'returned a response with status', event.status);
    }
  }), catchError(handleError));
};

function handleError(error: HttpErrorResponse) {
  const logging = new LoggingService();
  logging.error(error.url!, 'returned a response with status', error.status);
  return throwError(() => new HttpErrorResponse({
    error: error.error.message,
    status: error.status,
    url: error.url!
  }));
}


