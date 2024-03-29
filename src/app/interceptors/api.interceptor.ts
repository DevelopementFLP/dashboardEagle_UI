import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize, Observable } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private activeRequest = 0;

    constructor(private ngxUiLoaderService: NgxUiLoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.activeRequest === 0)
            this.ngxUiLoaderService.start();

        this.activeRequest++;
        return next.handle(req).pipe(finalize(() => this.stopLoader()));
    }

    private stopLoader(): void {
        this.activeRequest--;
        if(this.activeRequest === 0)
            this.ngxUiLoaderService.stop();
    }
}