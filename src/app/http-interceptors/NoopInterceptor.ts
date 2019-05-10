import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * @author 杨晓辉
 * http 请求拦截器
 */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  private baseUrl: string;

  constructor(private router: Router) {
    if (environment.production == true) {
      // 生产环境
      this.baseUrl = 'http://106.12.195.114:8081';
    } else {
      // 开发环境
      this.baseUrl = 'http://localhost:8081';
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let ok: string;
    let request: HttpRequest<any>;
    // 登录无需要token
    if (req.url === '/user/login') {
      request = req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    } else {
      request = req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.set(
          'Authorization',
          localStorage.getItem('token'),
        ),
      });
    }

    return next.handle(request).pipe(
      tap(
        event => (ok = event instanceof HttpErrorResponse ? 'success' : ''),
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 403:
              // 登录错误，返回
              localStorage.clear();
              this.router.navigateByUrl('/login');
              break;
            default:
              break;
          }
        },
      ),
    );
  }
}
