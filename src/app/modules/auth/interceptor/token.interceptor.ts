import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";

@Injectable(
  {providedIn:"root"}
)
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private router: Router,
              private localStorage:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login') ||
      request.url.includes('signup')   ) {
      return next.handle(request);
    }

    const jwtToken = this.authService.getJwt();

    const modifiedRequest = this.addToken(request, jwtToken);

    return next.handle(modifiedRequest).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
            this.localStorage.clear();
          this.router.navigate(['/login'],{queryParams:{loggedin:false}});
        }
        return throwError(error);
      })
    );
  }


  private addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers : req.headers.set("Authorization","Bearer "+jwtToken)
    })
  }
}
