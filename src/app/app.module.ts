import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ApiInterceptor } from './interceptors/api.interceptor';

import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';
import { EagleInfoComponent } from './components/eagle-info/eagle-info.component';
import { ChartComponent } from './components/chart/chart.component';
import { PrimengModule } from './primeng/primeng.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent,
    EagleInfoComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NgxUiLoaderModule,
    PrimengModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
