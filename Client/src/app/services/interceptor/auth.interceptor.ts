import { HttpInterceptor,HttpHandler,HttpRequest,HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    intercept(req: import("@angular/common/http").HttpRequest<any>, 
    next: import("@angular/common/http").HttpHandler): Observable<HttpEvent<any>> {
        
        const idToken = sessionStorage.getItem("key");
        
        if(idToken){

            let headers = new HttpHeaders({
                "Authorization" : idToken
            })
 
            const cloned = req.clone({

                headers

            })

            return next.handle(cloned);

        }
        else{
            return next.handle(req);
        }
    }

}