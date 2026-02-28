import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CsrfService } from '../services/csrf.service';

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
    constructor(private csrfService: CsrfService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!SAFE_METHODS.includes(request.method)) {
            const token = this.csrfService.getToken();
            if (token) {
                request = request.clone({
                    setHeaders: { 'x-csrf-token': token }
                });
            }
        }
        return next.handle(request);
    }
}
